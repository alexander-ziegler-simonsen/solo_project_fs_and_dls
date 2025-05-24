import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("Storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}