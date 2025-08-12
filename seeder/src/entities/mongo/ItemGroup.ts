import { Entity, ObjectId, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, Column, OneToMany } from "typeorm";
import "reflect-metadata";

@Entity("itemgroup")
 export class ItemGroup {

    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;
}
