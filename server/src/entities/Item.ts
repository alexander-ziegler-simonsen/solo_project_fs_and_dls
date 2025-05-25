import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Item{

    @ObjectIdColumn()
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

@Entity("Item")
 export class Item_post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    fk_group_id: string;
}