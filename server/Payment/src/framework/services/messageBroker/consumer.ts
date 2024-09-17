import kafka  from '../../webServer/config/kafkaConfig';
import { userusecase } from '../../webServer/routes/injections/injection';
const consumer = kafka.consumer({ groupId: 'payment-service' });
// const { processPayment } = require('../../application/PaymentProcessingUseCase');

const runPaymentConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-signups', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }:any) => {
      const userData = JSON.parse(message.value.toString());
      console.log(userData)
    await  userusecase.createUser(userData)
      // await processPayment(userData);
    },
  });
};

export default  runPaymentConsumer ;