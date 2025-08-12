import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import { ItemGroup_post } from "./ItemGroup";
import { OrderItem_post } from "./OrderItem";

@Entity("item")
export class Item_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column("text",{ nullable: false })
    name: string;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    @Column("text")
    info: string;

    @Column("text")
    description: string;

    @Column("text")
    image: string;

    @ManyToOne(() => ItemGroup_post, (group) => group.items, { nullable: true })
    @JoinColumn({ name: 'fk_group_id' })
    group: ItemGroup_post;

    @OneToMany(() => OrderItem_post, (orderItem) => orderItem.item)
    orderItems: OrderItem_post[];

    @Column()
    fk_group_id: number;
}