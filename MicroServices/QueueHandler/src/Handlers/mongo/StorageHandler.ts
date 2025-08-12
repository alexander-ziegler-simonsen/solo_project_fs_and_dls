import { MongodbDataSource } from "../../DataSource";
import { Storage } from "../../entities/Storage";
// TODO - REWRITE ALL THIS
async function StorageDelete(data) {

}
    // TODO - REWRITE ALL THIS
async function StorageUpdate(data) {

}
// TODO - REWRITE ALL THIS
async function StoragePost(data) {
    try {
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - storage post error:", error);
    }
}
// TODO - REWRITE ALL THIS
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