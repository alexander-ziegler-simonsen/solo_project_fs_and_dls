import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("ItemGroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    static fromData(data:any){
        let res = new ItemGroup_post();

        res.id = data.id;
        res.name = data.name;

        return res;
    }
}