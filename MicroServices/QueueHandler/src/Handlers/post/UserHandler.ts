import { User_post } from "../../entities/User";
import { PostgresDataSource } from "../../DataSource";

async function UserDelete(data) {

}

async function UserUpdate(data) {

}

async function UserPost(data) {
    try {
        await PostgresDataSource.manager.save(User_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - User post error:", error);
    }
}

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