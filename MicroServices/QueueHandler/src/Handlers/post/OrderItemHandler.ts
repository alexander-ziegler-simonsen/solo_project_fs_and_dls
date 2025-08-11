import { PostgresDataSource } from "../../DataSource"
import { OrderItem_post } from "../../entities/OrderItem";

async function OrderItemDelete(data) {
    // TODO - test OrderItem delete
    try {
        const orderRepository = PostgresDataSource.getRepository(OrderItem_post);
        console.log("OrderItem delete was called");
        


        const orderToDeleteRef: OrderItem_post = await orderRepository.findOneBy({_id: data._id});
        console.log("itemToDeleteRef value:", orderToDeleteRef);

        await orderRepository.delete(orderToDeleteRef);
    }
    catch (error) {
        console.error("queueHandler - OrderItem delete error:", error);
    }
}

async function OrderItemUpdate(data:OrderItem_post) {
    // TODO - test OrderItem update
    try {
        const orderRepository = PostgresDataSource.getRepository(OrderItem_post);
        console.log("ItemUpdate was called");
        


        const orderToUpdateRef: OrderItem_post = await orderRepository.findOneBy({_id: data._id});
        console.log("itemToUpdateRef value:", orderToUpdateRef);

        orderToUpdateRef.count = data.count;
        orderToUpdateRef.item = data.item;
        orderToUpdateRef.price = data.price;

        await orderRepository.save(orderToUpdateRef);
    }
    catch (error) {
        console.error("queueHandler - OrderItem update error:", error);
    }
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