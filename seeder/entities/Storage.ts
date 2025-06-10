import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Storage{
    
    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;
}

@Entity("Storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;
}