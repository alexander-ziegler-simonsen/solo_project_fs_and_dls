export interface Item {
    _id: number;
    name: string;
    price: number;
    info: string;
    description: string;
    image: string;
    fk_group_id: number;
}