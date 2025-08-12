
import { setDbAndFirstUser, AddData } from "./MongodbSeeder";
import { setPostgresDb, AddPostgresData, setAllTables, DropTable, GetPostItems, GetOrders, GetUsers } from "./PostgresSeeder";

// mongo
import { Item } from "./entities/mongo/Item";
import { Storage } from "./entities/mongo/Storage";
import { ItemGroup } from "./entities/mongo/ItemGroup";
import { User } from "./entities/mongo/User";
import { OrderDocument } from "./entities/mongo/OrderDocument";

// postgres
import { Item_post } from "./entities/postgres/Item";
import { ItemGroup_post } from "./entities/postgres/ItemGroup";
import { Order_post } from "./entities/postgres/Order";
import { OrderItem_post } from "./entities/postgres/OrderItem";
import { User_post } from "./entities/postgres/User";
import { Storage_post } from "./entities/postgres/Storage";

// data
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

async function endAll() {
    process.exit(0);
}

async function PostgresSeeding()
{
    // postgres
    await setPostgresDb();

    // drop tables
    // await DropTable("orderitem");
    // await DropTable(`"order"`);
    // await DropTable("item");
    // await DropTable(`"user"`);
    // await DropTable("itemgroup");

    await setAllTables();

    // no fk
    await AddPostgresData<ItemGroup_post>(ItemGroupDescription.name, ItemGroupDescription.keys, ItemGroupData as ItemGroup_post[]);
    await AddPostgresData<User_post>(userDescription.name, userDescription.keys, UserData as User_post[])

    // have fk
    await AddPostgresData<Item_post>(itemDescription.name, itemDescription.keys, ItemData as Item_post[])
    await AddPostgresData<Order_post>(OrderDescription.name, OrderDescription.keys,  OrderData as Order_post[]);
    await AddPostgresData<OrderItem_post>(OrderItemDescription.name, OrderItemDescription.keys, OrderItemData as OrderItem_post[]);
}

async function mongodbSeeding() {
    // get the denormalized, query-shaped documents of the data we added to the postgres
    

    // mongo
    await setDbAndFirstUser();
    //await AddData<item>(ItemData, "item");
    // await AddData<Order>(OrderData, "order");
    // await AddData<OrderItem>(OrderItemData, "orderitem");
    await AddData<ItemGroup>(ItemGroupData, "itemgroup");
    await AddData<User>(UserData, "user");

    let allTheNewItemJoinedDataFromPostgres = await GetPostItems();
    console.log("test1 values - get postItems:", allTheNewItemJoinedDataFromPostgres);



    //let test2 = await GetOrders();
    //console.log("test2 values - get GetOrders:", test2);    
    // let test3 = await GetUsers();
    // console.log("test3 values - get GetUsers:", test3);
}

async function main() {

    console.log("start of the seeder 'main' function");

    await PostgresSeeding();
    
    await mongodbSeeding();


    await endAll();

    return "done";
}

main().then(message => {
    console.log("message:", message);
    if(message == "done")
    {
        console.log("plz stop this program");
        endAll();
        
    }
}).catch(err => {
    console.log("seeder - error", err);
    //process.exit(0);
    //process.exit(1);
});