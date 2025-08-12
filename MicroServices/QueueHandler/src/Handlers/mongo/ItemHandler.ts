import { MongodbDataSource } from "../../DataSource";

import { Item } from "../../entities/Item";
// TODO - REWRITE ALL THIS
async function ItemDelete(data:any) {
    //console.log(data);
    // TODO - test "Item delete" works
    try {
        const itemRepository = MongodbDataSource.getRepository(Item);
        console.log("ItemUpdate was called");
        


        const itemToDeleteRef: Item = await itemRepository.findOneBy({_id: data._id});
        console.log("itemToUpdateRef value:", itemToDeleteRef);

        await itemRepository.delete(itemToDeleteRef);
    }
    catch (error) {
        console.error("queueHandler - Item delete error:", error);
    }
}
// TODO - REWRITE ALL THIS
async function ItemUpdate(data:Item) {
    //console.log(data);
    try {
        const itemRepository = MongodbDataSource.getRepository(Item);
        console.log("ItemUpdate was called");
        


        const itemToUpdateRef: Item = await itemRepository.findOneBy({_id: data._id});
        console.log("itemToUpdateRef value:", itemToUpdateRef);

        itemToUpdateRef.name = data.name;
        itemToUpdateRef.info = data.info;
        itemToUpdateRef.description = data.description;
        itemToUpdateRef.image = data.image;
        itemToUpdateRef.fk_group_id = data.fk_group_id;
        itemToUpdateRef.price = data.price;

        await itemRepository.save(itemToUpdateRef);
    }
    catch (error) {
        console.error("queueHandler - Item update error:", error);
    }
}
// TODO - REWRITE ALL THIS
async function ItemPost(data:any) {
    try {
        await MongodbDataSource.manager.save(data);
    }
    catch (error) {
        console.error("queueHandler - Item post error:", error);
    }

}
// TODO - REWRITE ALL THIS
export async function ItemHandler(typeOfAction:string, data:any) {
    if (typeOfAction == "post") {
        await ItemPost(data);
    }
    else if (typeOfAction == "put") {
        await ItemUpdate(data);
    }
    else if (typeOfAction == "delete") {
        await ItemDelete(data);
    }
}