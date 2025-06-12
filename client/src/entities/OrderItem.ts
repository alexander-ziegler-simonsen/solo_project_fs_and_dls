export interface OrderItem {
    _id: number;
    fk_item_id: number;
    fk_order_id: number;
    count: number;
    price: number;
}