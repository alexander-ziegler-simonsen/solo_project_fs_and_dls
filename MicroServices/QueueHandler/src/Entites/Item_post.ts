import { Entity, ObjectId, PrimaryGeneratedColumn, ObjectIdColumn, PrimaryColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity("Item")
export class Item_post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    fk_group_id: string;

    static fromData(data) {
        let res = new Item_post();

        res.id = data.id ? +data.id : undefined;
        res.name = data.name;
        res.description = data.description;
        res.price = +data.price;
        res.fk_group_id = data.fk_group_id;

        return res;
    }
}

