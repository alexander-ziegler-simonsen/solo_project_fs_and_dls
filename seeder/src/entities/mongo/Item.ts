import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import "reflect-metadata";

@Entity()
export class Item {

    @PrimaryColumn()
    _id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    info: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column("simple-json")
    group: {_id: number , name: string,};
}

