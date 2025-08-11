import { PostgresDataSource } from "../../DataSource";
import { Item_post } from "../../entities/Item";

async function ItemDelete(data:any) {
    //console.log(data);
    // TODO - test "Item delete" works
    try {
        const itemRepository = PostgresDataSource.getRepository(Item_post);
        console.log("ItemUpdate was called");
        


        const itemToDeleteRef: Item_post = await itemRepository.findOneBy({_id: data._id});
        console.log("itemToUpdateRef value:", itemToDeleteRef);

        await itemRepository.delete(itemToDeleteRef);
    }
    catch (error) {
        console.error("queueHandler - Item delete error:", error);
    }
}

async function ItemUpdate(data:Item_post) {
    //console.log(data);
    try {
        const itemRepository = PostgresDataSource.getRepository(Item_post);
        console.log("ItemUpdate was called");
        


        const itemToUpdateRef: Item_post = await itemRepository.findOneBy({_id: data._id});
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

async function ItemPost(data:any) {
    try {
        await PostgresDataSource.manager.save(Item_post.fromData(data));
    }
    catch (error) {
        console.error("queueHandler - Item post error:", error);
    }

}

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