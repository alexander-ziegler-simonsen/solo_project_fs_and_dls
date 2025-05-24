interface ItemData {
    id: number;
    name: string;
    price: number;
    info: string;
    description: string;
    image: string;
    fk_group_id: string
}

async function ItemDelete(data) {
    
}
    
async function ItemUpdate(data) {

}

async function ItemPost(data) {

}

export async function ItemHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        ItemPost(data);
    }
    else if(typeOfAction == "put")
    {
        ItemUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        ItemDelete(data);
    }
}