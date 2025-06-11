import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import { Item_post } from "./Item";
import { Order_post } from "./Order";

@Entity()
export class OrderItem {

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

@Entity("orderitem")
export class OrderItem_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @ManyToOne(() => Item_post, (item) => item.orderItems, { nullable: false })
    @JoinColumn({ name: 'fk_item_id' })
    item: Item_post;

    @ManyToOne(() => Order_post, (order) => order.orderItems, { nullable: false })
    @JoinColumn({ name: 'fk_order_id' })
    order: Order_post;

    @Column()
    count: number;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    static fromData(data:any) {
        let res = new OrderItem_post();

        res._id = data._id;
        res.item = data.item;
        res.order = data.order;
        res.count = data.count;
        res.price = +data.price;

        return res;
    }
}