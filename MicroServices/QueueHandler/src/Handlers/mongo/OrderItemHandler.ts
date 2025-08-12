import { MongodbDataSource } from "../../DataSource"
import { OrderItem } from "../../entities/OrderItem";
// TODO - REWRITE ALL THIS
async function OrderItemDelete(data) {
    // TODO - test OrderItem delete
    try {
        const orderRepository = MongodbDataSource.getRepository(OrderItem);
        console.log("OrderItem delete was called");
        


        const orderToDeleteRef: OrderItem = await orderRepository.findOneBy({_id: data._id});
        console.log("itemToDeleteRef value:", orderToDeleteRef);

        await orderRepository.delete(orderToDeleteRef);
    }
    catch (error) {
        console.error("queueHandler - OrderItem delete error:", error);
    }
}
// TODO - REWRITE ALL THIS
async function OrderItemUpdate(data:OrderItem) {
    // TODO - test OrderItem update
    try {
        const orderRepository = MongodbDataSource.getRepository(OrderItem);
        console.log("ItemUpdate was called");
        


        const orderToUpdateRef: OrderItem = await orderRepository.findOneBy({_id: data._id});
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
// TODO - REWRITE ALL THIS
async function OrderItemPost(data) {
    try {
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - OrderItem post error:", error);
    }
}
// TODO - REWRITE ALL THIS
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