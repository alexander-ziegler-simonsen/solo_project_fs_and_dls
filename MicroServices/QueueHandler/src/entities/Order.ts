import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import "reflect-metadata";
import { User_post } from "./User";
import { OrderItem_post } from "./OrderItem";

@Entity()
export class Order {

    @PrimaryColumn()
    _id: number;

    @Column()
    fk_user_id: number;
}

@Entity("order")
export class Order_post {
    @PrimaryGeneratedColumn()
    _id: number;

    @ManyToOne(() => User_post, (user) => user.orders, { nullable: false })
    @JoinColumn({ name: 'fk_user_id' })
    user: User_post;

    @OneToMany(() => OrderItem_post, (orderItem) => orderItem.order)
    orderItems: OrderItem_post[];

    static fromData(data:any){
        let res = new Order_post();

        res._id = data._id;
        res.user = data.user;
        res.orderItems = data.orderItems;

        return res;
    }
}