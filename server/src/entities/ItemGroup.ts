import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class ItemGroup {

    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;
}

@Entity("ItemGroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}