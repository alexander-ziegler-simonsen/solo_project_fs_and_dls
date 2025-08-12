import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import "reflect-metadata";
import { Item_post } from "./Item";

@Entity("itemgroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column("text",{nullable:false})
    name: string;

    @OneToMany(() => Item_post, (item) => item.group)
    items: Item_post[];
}