import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("order")
 export class Order_post{
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    fk_user_id: string;

    static fromData(data:any){
        let res = new Order_post();

        res._id = data.id;
        res.fk_user_id = data.fk_user_id;

        return res;
    }
}