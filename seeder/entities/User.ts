import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
 export class User{
    
    @Column()
    _id: number;
    
    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    email: string;
    
    @Column()
    phoneNumber: string;
    
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
    phoneNumber: string;
    
    @Column()
    address: string;
}