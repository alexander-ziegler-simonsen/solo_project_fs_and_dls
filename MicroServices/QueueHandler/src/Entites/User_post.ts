import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column, BaseEntity } from "typeorm";
import "reflect-metadata";

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

    static fromData(data:any) {
        let res = new User_post();

        res._id = data.id;
        res.username = data.username;
        res.password = data.password;
        res.email = data.email;
        res.phone = data.phone;
        res.address = data.address;

        return res;
    }
}