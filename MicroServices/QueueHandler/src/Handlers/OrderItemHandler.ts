interface OrderItemData {
    id: string,
    fk_item_id: string,
    fk_order_id: string,
    count: number,
    price: number
}

async function OrderItemDelete(data) {
    
}
    
async function OrderItemUpdate(data) {

}

async function OrderItemPost(data) {

}

export async function OrderItemHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        OrderItemPost(data);
    }
    else if(typeOfAction == "put")
    {
        OrderItemUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        OrderItemDelete(data);
    }
}