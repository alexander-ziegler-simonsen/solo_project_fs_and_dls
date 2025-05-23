import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class Order{
    
    @ObjectIdColumn()
    id: string;

    @Column()
    fk_user_id: string;
}

@Entity("Order")
 export class Order_post{
    
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    fk_user_id: string;
}