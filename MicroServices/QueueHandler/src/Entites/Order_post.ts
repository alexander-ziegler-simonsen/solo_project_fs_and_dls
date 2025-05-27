import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("Order")
 export class Order_post{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fk_user_id: string;

    static fromData(data){
        let res = new Order_post();

        res.id = data.id;
        res.fk_user_id = data.fk_user_id;

        return res;
    }
}