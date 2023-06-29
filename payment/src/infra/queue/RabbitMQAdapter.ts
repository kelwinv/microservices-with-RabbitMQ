import { Queue } from "./Queue";

import amqp from "amqplib";

class RabbitMQAdapter implements Queue {
  connection?: amqp.Connection;

  async connect(): Promise<void> {
    this.connection = await amqp.connect("amqp://localhost");
  }

  async on<T>(queueName: string, callback: (event: T) => void): Promise<void> {
    const channel = await this.connection?.createChannel();
    if (!channel) {
      throw new Error(`Cannot connect to RabbitMQ`);
    }

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.consume(queueName, (msg) => {
      if (msg) {
        callback(JSON.parse(msg?.content.toString()));
        channel.ack(msg);
      } else {
        console.log(`Error in ${queueName}: message received`);
      }
    });
  }

  async publish(queueName: string, data: unknown): Promise<void> {
    const channel = await this.connection?.createChannel();
    if (!channel) {
      throw new Error(`Cannot connect to RabbitMQ`);
    }

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }
}

export { RabbitMQAdapter };
