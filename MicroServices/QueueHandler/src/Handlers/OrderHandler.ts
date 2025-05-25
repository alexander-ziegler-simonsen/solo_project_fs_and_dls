import { PostgresDataSource } from "../DataSource";
import { Order_post } from "../Entites/Order_post";

async function OrderDelete(data) {

}

async function OrderUpdate(data) {

}

async function OrderPost(data) {
    try {
        await PostgresDataSource.manager.save(Order_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - Order post error:", error);
    }
}

export async function OrderHandler(typeOfAction, data) {
    if (typeOfAction == "post") {
        await OrderPost(data);
    }
    else if (typeOfAction == "put") {
        await OrderUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await OrderDelete(data);
    }
}