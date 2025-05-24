import { connect } from "amqplib";
import { error } from "console";

const RABBIT_HOST = process.env.RABBITMQ_HOST || "localhost";
const RABBIT_PORT = process.env.RABBITMQ_PORT || 5433;
const RABBIT_USERNAME = process.env.RABBITMQ_USERNAME || "admin";
const RABBIT_PASSWORD = process.env.RABBITMQ_PASSWORD || "password";

class RabbitMQHelper {
    private connection: any;

    constructor() {
        this.connection = connect(`amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}`);
    }

    public getConnection() {
        if (!connect) {
            throw new Error("something wrong with rabbitmq, it is not connecting...");
        }
        return this.connection;
    }

    public async handlePostToChannel(channelName, typeOfAction, endpointName, data) {
        try {
            const rabbitHelper = new RabbitMQHelper();

            const connection = rabbitHelper.getConnection();

            const channel = (await connection).createChannel();

            const queue = channelName;
            const message = { endpointName: endpointName, typeOfAction: typeOfAction, data: data };

            (await channel).assertQueue(queue, { durable: false });

            (await channel).sendToQueue(queue, Buffer.from(JSON.stringify(message)));

            return true;
        }
        catch (err) {
            console.error("item_group post error:", err);

            return false;
        }
    }
}

export default RabbitMQHelper;