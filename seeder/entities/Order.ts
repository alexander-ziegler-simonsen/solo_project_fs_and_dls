import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Order{
    
    @Column()
    _id: number;

    @Column()
    fk_user_id: number;
}

@Entity("Order")
 export class Order_post{
    
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    fk_user_id: number;
}