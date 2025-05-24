import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("OrderItem")
 export class OrderItem_post {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    fk_item_id: string;

    @Column()
    fk_order_id: string;

    @Column()
    count: number;

    @Column()
    price: number;
}