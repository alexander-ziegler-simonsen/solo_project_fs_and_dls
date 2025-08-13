import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Storage{
    
    @PrimaryColumn()
    _id: number;

    @Column()
    count: number;

    @Column()
    fk_item_id: number;
}

@Entity("storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    count: number;

    @Column()
    fk_item_id: number;
}