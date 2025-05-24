interface OrderData {
    id: string,
    fk_user_id: string,
}

async function OrderDelete(data) {
    
}
    
async function OrderUpdate(data) {

}

async function OrderPost(data) {

}

export async function OrderHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        OrderPost(data);
    }
    else if(typeOfAction == "put")
    {
        OrderUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        OrderDelete(data);
    }
}