import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity()
 export class OrderItem{
    
    @PrimaryColumn()
    _id: number;

    @Column()
    fk_item_id: number;

    @Column()
    fk_order_id: number;

    @Column()
    count: number;

    @Column()
    price: number;
}

@Entity("OrderItem")
 export class OrderItem_post {
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    fk_item_id: number;

    @Column()
    fk_order_id: number;

    @Column()
    count: number;

    @Column("decimal")
    price: number;
}