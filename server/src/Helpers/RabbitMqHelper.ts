import { connect } from "amqplib";
import { error } from "console";

const RABBIT_HOST = process.env.RABBITMQ_HOST || "localhost";
const RABBIT_PORT = process.env.RABBITMQ_PORT || 5673;
const RABBIT_USERNAME = process.env.RABBITMQ_USERNAME || "admin";
const RABBIT_PASSWORD = process.env.RABBITMQ_PASSWORD || "password";

class RabbitMQHelper {
    private connection: any;

    public async getConnection() {
        this.connection = await connect(`amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}`);
        return this.connection;
    }

    public async handlePostToChannel(channelName, typeOfAction, endpointName, data) {
        try {
            const connection = await this.getConnection();

            const channel = await connection.createChannel()

            const queue = channelName;
            const message = { endpointName: endpointName, typeOfAction: typeOfAction, data: data };

            await channel.assertQueue(queue, { durable: false });

            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

            // close connection after you're done with it

            await channel.close();

            await this.connection.close();

            return true;
        }
        catch (err) {
            console.error("item_group post error:", err);

            return false;
        }
    }
}

export default RabbitMQHelper;