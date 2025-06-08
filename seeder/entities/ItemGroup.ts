import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class ItemGroup {

    @Column()
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