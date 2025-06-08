import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class OrderItem{
    
    @Column()
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