import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("ItemGroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;
}