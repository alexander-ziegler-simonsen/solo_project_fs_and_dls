import { Entity, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";
import { ItemGroup } from "./ItemGroup";


@Entity()
export class OrderDocument {

    @PrimaryColumn()
    orderId: number;
    
    @Column()
    user!: {
        _id: number;
        username: string;
        password: string;
        email: string;
        phone: string;
        address: string;
    };

    @Column()
    items!: Array<{
        _id: number;
        name: string;
        price: number;
        info: string;
        description: string;
        image: string;
        groupData: ItemGroup; // TODO - test if this works
        count: number;
    }>;
}