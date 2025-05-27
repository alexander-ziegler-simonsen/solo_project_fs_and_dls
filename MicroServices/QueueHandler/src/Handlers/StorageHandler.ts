import { PostgresDataSource } from "../DataSource";
import { Storage_post } from "../Entites/Storage_post";

async function StorageDelete(data) {

}
    
async function StorageUpdate(data) {

}

async function StoragePost(data) {
    try {
        await PostgresDataSource.manager.save(Storage_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - storage post error:", error);
    }
}

export async function StorageHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        await StoragePost(data);
    }
    else if(typeOfAction == "put")
    {
        await StorageUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        await StorageDelete(data);
    }
}