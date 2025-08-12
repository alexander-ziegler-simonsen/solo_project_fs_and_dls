import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { Order_post } from "./Order";

@Entity()
 export class User{
    
    @PrimaryColumn()
    _id: number;
    
    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    email: string;
    
    @Column()
    phone: string;
    
    @Column()
    address: string;
}

@Entity("user")
 export class User_post{
    
    @PrimaryGeneratedColumn()
    _id: number;
    
    @Column("text",{nullable:false, unique: true})
    username: string;
    
    @Column("text",{nullable:false})
    password: string;
    
    @Column("text",{nullable:false, unique: true })
    email: string;
    
    @Column("text",{nullable:false})
    phone: string;
    
    @Column("text",{nullable:false})
    address: string;

    @OneToMany(() => Order_post, (order) => order.user)
    orders: Order_post[];
}