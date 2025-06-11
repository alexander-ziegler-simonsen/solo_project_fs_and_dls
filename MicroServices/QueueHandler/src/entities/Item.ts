import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import { ItemGroup_post } from "./ItemGroup";
import { OrderItem_post } from "./OrderItem";

@Entity()
export class Item {

@PrimaryColumn()
    _id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    info: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    fk_group_id: number;
}

@Entity("item")
export class Item_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column({ nullable: false })
    name: string;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;

    @Column()
    info: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @ManyToOne(() => ItemGroup_post, (group) => group.items, { nullable: true })
    @JoinColumn({ name: 'fk_group_id' })
    group: ItemGroup_post;

    @OneToMany(() => OrderItem_post, (orderItem) => orderItem.item)
    orderItems: OrderItem_post[];

    @Column()
    fk_group_id: number;

    static fromData(data:any) {
        let res = new Item_post();

        res._id = data._id ? +data._id : undefined;
        res.name = data.name;
        res.price = +data.price;
        res.info = data.info;
        res.image = data.image;
        res.description = data.description;
        res.fk_group_id = data.fk_group_id;

        return res;
    }
}