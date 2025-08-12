import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import "reflect-metadata";
import { User_post } from "./User";
import { OrderItem_post } from "./OrderItem";



@Entity("order")
export class Order_post {
    @PrimaryGeneratedColumn()
    _id: number;

    @ManyToOne(() => User_post, (user) => user.orders, { nullable: false })
    @JoinColumn({ name: 'fk_user_id' })
    user: User_post;

    @OneToMany(() => OrderItem_post, (orderItem) => orderItem.order)
    orderItems: OrderItem_post[];
}