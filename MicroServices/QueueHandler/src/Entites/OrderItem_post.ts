import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("OrderItem")
export class OrderItem_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    fk_item_id: string;

    @Column()
    fk_order_id: string;

    @Column()
    count: number;

    @Column("decimal")
    price: number;

    static fromData(data:any) {
        let res = new OrderItem_post();

        res._id = data.id;
        res.fk_item_id = data.fk_item_id;
        res.fk_order_id = data.fk_order_id;
        res.count = data.count;
        res.price = data.price;

        return res;
    }
}