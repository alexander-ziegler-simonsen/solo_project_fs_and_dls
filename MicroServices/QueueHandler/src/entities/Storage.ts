import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Storage{
    
    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;
}

@Entity("storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column("text",{nullable:false})
    name: string;
}