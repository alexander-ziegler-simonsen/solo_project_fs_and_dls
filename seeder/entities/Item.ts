import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Item{

    @Column()
    _id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    fk_group_id: number;
}

@Entity("Item")
 export class Item_post{

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    fk_group_id: number;
}