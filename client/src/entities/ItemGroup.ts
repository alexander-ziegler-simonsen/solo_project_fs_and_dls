import { Entity, ObjectId, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class ItemGroup {

    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;
}

@Entity("ItemGroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;
}