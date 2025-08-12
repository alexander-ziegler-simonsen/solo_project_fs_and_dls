import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";



@Entity("storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    count: number;

    @Column()
    fk_item_id: number;
}