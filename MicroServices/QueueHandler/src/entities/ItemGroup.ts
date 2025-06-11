import { Entity, ObjectId, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, Column, OneToMany } from "typeorm";
import "reflect-metadata";
import { Item_post } from "./Item";

@Entity()
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

    static fromData(data:any){
        let res = new ItemGroup_post();

        res._id = data._id;
        res.name = data.name;
        res.items = data.items;

        return res;
    }
}