import amqp from "amqplib";
import 'dotenv/config';

import { PostgresDataSource } from "./DataSource";
import { ManageQueue } from "./Helper/ManageQueues";

const RABBIT_HOST = process.env.RABBITMQ_HOST || "localhost";
const RABBIT_PORT = process.env.RABBITMQ_PORT || 5673;
const RABBIT_USERNAME = process.env.RABBITMQ_USERNAME || "admin";
const RABBIT_PASSWORD = process.env.RABBITMQ_PASSWORD || "password";

async function main() {

    try {
        const connection = await amqp.connect(`amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}`);
        connection.on('error', (err) => {
            console.log("error connecting", err);
        });

        const channel = await connection.createChannel();

        // // the 3 queue stream names
        const queue = ["posts", "updates", "deletes"];

        // postgres
        await PostgresDataSource.initialize()

        for (var queueName of queue) {
            // here we handle one message in queue by type of "queueName"
            await channel.assertQueue(queueName, { durable: false });
            channel.consume(queueName, async (msg) => {
                if (msg) {
                    let messageContent = JSON.parse(msg.content.toString());

                    // send to one of our switch handler functions
                    await ManageQueue(messageContent.typeOfAction, messageContent.endpointName, messageContent.data);
                    channel.ack(msg);
                }
            });
        }

    } catch (err) {
        console.error("queueHandler app - main - error:", err);
    }
}

main()