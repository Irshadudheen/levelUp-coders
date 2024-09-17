// config/kafkaConfig.js
import dotenv from 'dotenv/config'

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

export default kafka;
