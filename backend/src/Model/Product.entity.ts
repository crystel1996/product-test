import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare title: string

    @Column()
    declare price: number

    @Column()
    declare description: string

}