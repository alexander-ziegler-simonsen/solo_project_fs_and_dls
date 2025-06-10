import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("itemgroup")
 export class ItemGroup_post {

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    static fromData(data:any){
        let res = new ItemGroup_post();

        res._id = data.id;
        res.name = data.name;

        return res;
    }
}