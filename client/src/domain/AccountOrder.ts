import { AccountOrderItem } from "./AccountOrderItem";

export interface AccountOrder {
    Items: AccountOrderItem[],
    ShippingPrice: number,
    FullPrice: number,
    OrderNumber: number,
    TimeStamp: string,
}