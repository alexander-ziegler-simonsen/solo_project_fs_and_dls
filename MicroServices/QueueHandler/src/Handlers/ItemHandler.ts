import { PostgresDataSource } from "../DataSource";
import { Item_post } from "../Entites/Item_post";

async function ItemDelete(data) {

}

async function ItemUpdate(data) {

}

async function ItemPost(data) {
    try {
        await PostgresDataSource.manager.save(Item_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - Item post error:", error);
    }

}

export async function ItemHandler(typeOfAction, data) {
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