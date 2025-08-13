import { Entity, ObjectId, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, Column, OneToMany } from "typeorm";
import "reflect-metadata";
import { Item_post } from "./Item";

@Entity("itemgroup")
 export class ItemGroup {

    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;
}

@Entity("itemgroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column("text",{nullable:false})
    name: string;

    @OneToMany(() => Item_post, (item) => item.group)
    items: Item_post[];
}