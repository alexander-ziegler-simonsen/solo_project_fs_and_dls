import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("Item")
 export class Item_post{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    fk_group_id: string;
}