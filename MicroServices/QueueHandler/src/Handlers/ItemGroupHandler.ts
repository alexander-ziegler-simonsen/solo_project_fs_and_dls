import { PostgresDataSource } from "../DataSource";
import { ItemGroup_post } from "../entities/ItemGroup";

interface ItemGroupData {
    id: string,
    name: string
}

async function ItemGroupDelete(data) {

}

async function ItemGroupUpdate(data) {

}

async function ItemGroupPost(data) {
    try {
        await PostgresDataSource.manager.save(ItemGroup_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - ItemGroup post error:", error);
    }
}

export async function ItemGroupHandler(typeOfAction, data) {
    if (typeOfAction == "post") {
        await ItemGroupPost(data);
    }
    else if (typeOfAction == "put") {
        await ItemGroupUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await ItemGroupDelete(data);
    }
}