import { MongodbDataSource } from "../../DataSource";
import { Order } from "../../entities/Order";
// TODO - REWRITE ALL THIS
async function OrderDelete(data:any) {
    console.log(data);
}
// TODO - REWRITE ALL THIS
async function OrderUpdate(data:any) {
    console.log(data);

     try {
            // TODO - fix order entity

            // const orderRepository = MongodbDataSource.getRepository(Order_post);
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
// TODO - REWRITE ALL THIS
async function OrderPost(data:any) {
    try {
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - Order post error:", error);
    }
}
// TODO - REWRITE ALL THIS
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