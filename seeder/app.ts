
import { setDbAndFirstUser, AddData } from "./MongodbSeeder";
import { setDb } from "./PostgresSeeder";

import { Item } from "./entities/Item";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { ItemGroup } from "./entities/ItemGroup";

import ItemData from "./data/Items.json";
import ItemGroupData from "./data/ItemGroup.json";
import OrderData from "./data/Orders.json";
import OrderItemData from "./data/OrderItems.json";


async function main() {
    await setDbAndFirstUser();
    await setDb();

    await AddData<Item>(ItemData, "items");
    await AddData<Order>(OrderData, "orders");
    await AddData<OrderItem>(OrderItemData, "orderItems");
    await AddData<ItemGroup>(ItemGroupData, "itemGroups");
}

main();