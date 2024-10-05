
// import kafka from '../../webServer/config/kafkaConfig';
import amqp from 'amqplib';
const sendSignupData = async (userData:any) => {
//     const producer = kafka.producer();
//   await producer.connect();
//   await producer.send({
//     topic: 'user-signups',
//     messages: [{ value: JSON.stringify(userData) }],
//   });
//   await producer.disconnect();
try {
  
  const connection = await amqp.connect({
    hostname: "rabbitmq",
    port: 5672,
    username: "admin",
    password: "admin123",
    vhost: "/",
  });
  const channel = await connection.createChannel();
  const queue = 'user_data';
  
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
  await channel.close(); // Close the channel after sending the message
  await connection.close(); 
} catch (error) {
  console.error("Error sending signup data:", error); 
}
};
export{ sendSignupData };