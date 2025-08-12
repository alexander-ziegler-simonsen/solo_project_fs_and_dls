import { ItemGroupHandler } from "../Handlers/post/ItemGroupHandler";
import { ItemHandler } from "../Handlers/post/ItemHandler";
import { OrderHandler } from "../Handlers/post/OrderHandler";
import { OrderItemHandler } from "../Handlers/post/OrderItemHandler";
import { UserHandler } from "../Handlers/post/UserHandler";
import { StorageHandler } from "../Handlers/post/StorageHandler";

async function HandlePut(endpointName, data) {
    switch (endpointName) {
        case "order": {
            await OrderHandler("put", data);
            break;
        }
        case "order_item": {
            await OrderItemHandler("put", data);
            break;
        }
        case "storage": {
            await StorageHandler("put", data);
            break;
        }
        case "item": {
            await ItemHandler("put", data);
            break;
        }
        case "item_group": {
            await ItemGroupHandler("put", data);
            break;
        }
        case "user": {
            await UserHandler("put", data);
            break;
        }
    }
}

async function HandleDelete(endpointName, data) {
    switch (endpointName) {
        case "order": {
            await OrderHandler("delete", data);
            break;
        }
        case "order_item": {
            await OrderItemHandler("delete", data);
            break;
        }
        case "storage": {
            await StorageHandler("delete", data);
            break;
        }
        case "item": {
            await ItemHandler("delete", data);
            break;
        }
        case "item_group": {
            await ItemGroupHandler("delete", data);
            break;
        }
        case "user": {
            await UserHandler("delete", data);
            break;
        }
    }
}

async function HandlePost(endpointName, data) {
    switch (endpointName) {
        case "order": {
            await OrderHandler("post", data);
            break;
        }
        case "order_item": {
            await OrderItemHandler("post", data);
            break;
        }
        case "storage": {
            await StorageHandler("post", data);
            break;
        }
        case "item": {
            await ItemHandler("post", data);
            break;
        }
        case "item_group": {
            await ItemGroupHandler("post", data);
            break;
        }
        case "user": {
            await UserHandler("post", data);
            break;
        }
    }
}

export async function ManageQueue(typeOfAction, endpointName, data) {
    if (typeOfAction == "post") {
        await HandlePost(endpointName, data);
    }
    else if (typeOfAction == "put") {
        await HandlePut(endpointName, data);
    }
    else if (typeOfAction == "delete") {
        await HandleDelete(endpointName, data);
    }
}