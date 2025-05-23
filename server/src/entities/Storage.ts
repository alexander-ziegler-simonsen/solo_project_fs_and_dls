import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Storage{
    
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;
}

@Entity("Storage")
 export class Storage_post {
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}