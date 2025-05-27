import { PostgresDataSource } from "../DataSource";
import { Item_post } from "../Entites/Item_post";

async function ItemDelete(data:any) {
    console.log(data);
}

async function ItemUpdate(data:any) {
    console.log(data);
}

async function ItemPost(data:any) {
    try {
        await PostgresDataSource.manager.save(Item_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - Item post error:", error);
    }

}

export async function ItemHandler(typeOfAction:string, data:any) {
    if (typeOfAction == "post") {
        await ItemPost(data);
    }
    else if (typeOfAction == "put") {
        await ItemUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await ItemDelete(data);
    }
}