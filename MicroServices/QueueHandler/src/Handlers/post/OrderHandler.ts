import { PostgresDataSource } from "../../DataSource";
import { Order_post } from "../../entities/Order";

async function OrderDelete(data:any) {
    console.log(data);
}

async function OrderUpdate(data:any) {
    console.log(data);

     try {
            // TODO - fix order entity

            // const orderRepository = PostgresDataSource.getRepository(Order_post);
            // console.log("ItemUpdate was called");
            
    
    
            // const orderToUpdateRef: Order_post = await orderRepository.findOneBy({_id: data._id});
            // console.log("itemToUpdateRef value:", orderToUpdateRef);
    
            // orderToUpdateRef = data.name;
    
            // await orderRepository.save(orderToUpdateRef);
        }
        catch (error) {
            console.error("queueHandler - Item update error:", error);
        }
}

async function OrderPost(data:any) {
    try {
        await PostgresDataSource.manager.save(Order_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - Order post error:", error);
    }
}

export async function OrderHandler(typeOfAction:string, data:any) {
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