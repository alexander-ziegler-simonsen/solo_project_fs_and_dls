import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
import "reflect-metadata";

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

@Entity("User")
 export class User_post{
    
    @PrimaryGeneratedColumn()
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