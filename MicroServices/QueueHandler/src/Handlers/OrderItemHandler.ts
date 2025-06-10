import { PostgresDataSource } from "../DataSource"
import { OrderItem_post } from "../Entites_OLD/OrderItem_post";

async function OrderItemDelete(data) {

}

async function OrderItemUpdate(data) {

}

async function OrderItemPost(data) {
    try {
        await PostgresDataSource.manager.save(OrderItem_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - OrderItem post error:", error);
    }
}

export async function OrderItemHandler(typeOfAction, data) {
    if (typeOfAction == "post") {
        await OrderItemPost(data);
    }
    else if (typeOfAction == "put") {
        await OrderItemUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await OrderItemDelete(data);
    }
}