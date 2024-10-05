// import kafka  from '../../webServer/config/kafkaConfig';
import amqp from 'amqplib';
import { userusecase } from '../../webServer/routes/injections/injection';
import { Iuser } from '../../../entities/user';
// const consumer = kafka.consumer({ groupId: 'payment-service' });

const MAX_RETRY_ATTEMPTS = 9; 
let retryAttempts = 0; 
const consumeUserData = async () => {
  try {
    await connectAndConsume('user_data', processUserData)
  } catch (error:any) {
    console.error('Error in consumeUserData:', error.message);
    if (retryAttempts < MAX_RETRY_ATTEMPTS) {
        console.log(`Retry attempt ${retryAttempts + 1} to connect.`);
        retryAttempts++;
        setTimeout(()=>{

             consumeUserData(); // Retry connecting
        },20000)
    } else {
        console.error('Max retry attempts reached. Could not connect to RabbitMQ.');
        // Handle further actions if needed after max retry attempts
    }
  }
  // await consumer.connect();
  // await consumer.subscribe({ topic: 'user-signups', fromBeginning: true });

  // await consumer.run({
  //   eachMessage: async ({ message }:any) => {
  //     const userData = JSON.parse(message.value.toString());
  //     console.log(userData)
  //   await  userusecase.createUser(userData)
     
  //   },
  // });
};
const processUserData = async (userData:Iuser)=>{
  console.log(userData,'the data in consume');
  await userusecase.createUser(userData)
}
const connectAndConsume = async (queueName:any, processDataFunction:any) => {
  const connection = await amqp.connect({
      hostname: "rabbitmq",
      port: 5672,
      username: "admin",
      password: "admin123",
      vhost: "/",
  });
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  console.log(`[*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

  channel.consume(queueName, (msg) => {
      if (msg !== null) {
          const data = JSON.parse(msg.content.toString());
          console.log(`[x] Received ${queueName} data:`, data);
          processDataFunction(data);
          channel.ack(msg);
      }
  });
};

export default  consumeUserData ;