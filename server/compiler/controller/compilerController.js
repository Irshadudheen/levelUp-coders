const k8s = require('@kubernetes/client-node');
const fs = require('fs');
const path = require('path');

const NAMESPACE = 'compiler';
const IMAGE = 'irhadudheen/sandbox:latest';
const SCRIPT_PATH = '/app/run_code.sh';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const jobsApi = kc.makeApiClient(k8s.BatchV1Api);

const createConfigMap = async (filename, content) => {
  const configMap = {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: `code-${Date.now()}`,
      namespace: NAMESPACE
    },
    data: {
      [filename]: content
    }
  };

  return await k8sApi.createNamespacedConfigMap(NAMESPACE, configMap);
};

const createJob = async (configMapName, filename, fileExtension) => {
  const job = {
    apiVersion: 'batch/v1',
    kind: 'Job',
    metadata: {
      name: `code-execution-${Date.now()}`,
      namespace: NAMESPACE
    },
    spec: {
      template: {
        spec: {
          containers: [{
            name: 'code-runner',
            image: IMAGE,
            command: [SCRIPT_PATH, fileExtension, `/user_code/${filename}`],
            volumeMounts: [{
              name: 'code-volume',
              mountPath: '/user_code'
            }]
          }],
          volumes: [{
            name: 'code-volume',
            configMap: {
              name: configMapName
            }
          }],
          restartPolicy: 'Never'
        }
      }
    }
  };

  return await jobsApi.createNamespacedJob(NAMESPACE, job);
};

const getPodName = async (jobName) => {
  const pods = await k8sApi.listNamespacedPod(NAMESPACE, undefined, undefined, undefined, undefined, `job-name=${jobName}`);
  return pods.body.items[0]?.metadata.name;
};

const streamLogs = async (res, podName) => {
  const stream = await k8sApi.readNamespacedPodLog(
    podName,
    NAMESPACE,
    'code-runner',
    { follow: true, tailLines: 100 }
  );

  stream.on('data', (chunk) => {
    const logData = chunk.toString('utf8').trim();
    if (logData) {
      res.write(`data: ${JSON.stringify({ log: logData })}\n\n`);
    }
  });

  return new Promise((resolve) => {
    stream.on('end', () => {
      res.write(`data: ${JSON.stringify({ log: 'Execution completed' })}\n\n`);
      resolve();
    });
  });
};

const runCode = async (req, res) => {
  try {
    const { filename, content } = req.body;
    if (!filename || !content) {
      return res.status(400).send('Filename and content are required.');
    }

    const fileExtension = path.extname(filename).slice(1);

    const configMap = await createConfigMap(filename, content);
    const job = await createJob(configMap.body.metadata.name, filename, fileExtension);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    let podName;
    while (!podName) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      podName = await getPodName(job.body.metadata.name);
    }

    await streamLogs(res, podName);
    res.end();

  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      res.status(500).send(`Failed to execute code: ${error.message}`);
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};

module.exports = { runCode };