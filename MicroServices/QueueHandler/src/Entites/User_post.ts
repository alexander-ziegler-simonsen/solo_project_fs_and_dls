import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("User")
export class User_post {

    @PrimaryGeneratedColumn()
    id: number;

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

    static fromData(data) {
        let res = new User_post();

        res.id = data.id;
        res.username = data.username;
        res.password = data.password;
        res.email = data.email;
        res.phoneNumber = data.phoneNumber;
        res.address = data.address;

        return res;
    }
}