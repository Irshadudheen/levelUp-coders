
import kafka from '../../webServer/config/kafkaConfig';
const sendSignupData = async (userData:any) => {
    const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: 'user-signups',
    messages: [{ value: JSON.stringify(userData) }],
  });
  await producer.disconnect();
};

export{ sendSignupData };