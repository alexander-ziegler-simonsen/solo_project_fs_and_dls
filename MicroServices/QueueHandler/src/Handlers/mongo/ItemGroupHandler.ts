import { MongodbDataSource } from "../../DataSource";
import { ItemGroup } from "../../entities/ItemGroup";

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
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - ItemGroup post error:", error);
    }
}

// TODO - REWRITE ALL THIS
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