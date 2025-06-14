import { Item } from "./Item";

export interface AccountOrderItem {
    Item: Item, 
    Amount: number,
    PriceAtTime: number,
}