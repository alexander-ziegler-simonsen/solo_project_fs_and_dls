
import { setDbAndFirstUser, AddData } from "./MongodbSeeder";
import { setPostgresDb, AddPostgresData, setAllTables, DropTable } from "./PostgresSeeder";

import { Item } from "./entities/Item";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { ItemGroup } from "./entities/ItemGroup";
import { User } from "./entities/User";

import ItemData from "./data/Items.json";
import ItemGroupData from "./data/ItemGroup.json";
import OrderData from "./data/Orders.json";
import OrderItemData from "./data/OrderItems.json";
import UserData from "./data/Users.json";

const itemDescription = {
    name: "item",
    keys: ["name","price","info","description","image","fk_group_id"]
};
const ItemGroupDescription = {
    name: "itemGroup",
    keys: ["name"]
};
const OrderDescription = {
    name: `"order"`,
    keys: ["fk_user_id"]
};
const OrderItemDescription = {
    name: "orderItem",
    keys: ["fk_item_id","fk_order_id","count","price"]
};
const userDescription = {
    name: `"user"`,
    keys: ["username","password","email","phone","address"]
};

async function main() {
    // mongo
    //await setDbAndFirstUser();
    //await AddData<Item>(ItemData, "item");
    //await AddData<Order>(OrderData, "order");
    //await AddData<OrderItem>(OrderItemData, "orderItem");
    //await AddData<ItemGroup>(ItemGroupData, "itemGroup");

    // postgres
    await setPostgresDb();

    // drop tables
    // await DropTable("user");
    // await DropTable("itemgroup");
    // await DropTable("item");
    // await DropTable("order");
    // await DropTable("orderitem");

    await setAllTables();

    // no fk
    await AddPostgresData<ItemGroup>(ItemGroupDescription.name, ItemGroupDescription.keys, ItemGroupData);
    await AddPostgresData<User>(userDescription.name, userDescription.keys, UserData)

    // have fk
    await AddPostgresData<Item>(itemDescription.name, itemDescription.keys, ItemData)
    await AddPostgresData<Order>(OrderDescription.name, OrderDescription.keys,  OrderData);
    await AddPostgresData<OrderItem>(OrderItemDescription.name, OrderItemDescription.keys, OrderItemData);
    
}

main();