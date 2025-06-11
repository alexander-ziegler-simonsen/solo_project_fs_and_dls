import { PostgresDataSource } from "../DataSource";
import { Order_post } from "../entities/Order";

async function OrderDelete(data:any) {
    console.log(data);
}

async function OrderUpdate(data:any) {
    console.log(data);
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