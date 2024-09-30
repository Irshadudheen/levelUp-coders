// config/kafkaConfig.js
import dotenv from 'dotenv/config'

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'my-app',
  brokers:['127.0.0.1:9092'],
});

export default kafka;
