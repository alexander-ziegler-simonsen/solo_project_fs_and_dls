import { User } from "../../entities/User";
import { MongodbDataSource } from "../../DataSource";
// TODO - REWRITE ALL THIS
async function UserDelete(data) {

}
// TODO - REWRITE ALL THIS
async function UserUpdate(data) {

}
// TODO - REWRITE ALL THIS
async function UserPost(data) {
    try {
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - User post error:", error);
    }
}
// TODO - REWRITE ALL THIS
export async function UserHandler(typeOfAction, data) {
    if (typeOfAction == "post") {
        await UserPost(data);
    }
    else if (typeOfAction == "put") {
        await UserUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await UserDelete(data);
    }
}