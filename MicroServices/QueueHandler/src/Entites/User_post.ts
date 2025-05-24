import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("User")
 export class User_post{
    
    @PrimaryGeneratedColumn()
    id: string;
    
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