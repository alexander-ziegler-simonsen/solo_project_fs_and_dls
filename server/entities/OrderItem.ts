
 export default interface OrderItem{
    id: string;
    fk_item_id: string;
    fk_order_id: string;
    count: number;
    price: number;
}