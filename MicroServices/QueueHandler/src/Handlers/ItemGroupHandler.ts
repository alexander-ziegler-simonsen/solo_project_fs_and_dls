

interface ItemGroupData {
    id: string,
    name: string
}

async function ItemGroupDelete(data) {
    
}
    
async function ItemGroupUpdate(data) {

}

async function ItemGroupPost(data) {

}

export async function ItemGroupHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        ItemGroupPost(data);
    }
    else if(typeOfAction == "put")
    {
        ItemGroupUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        ItemGroupDelete(data);
    }
}