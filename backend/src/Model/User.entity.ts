import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    declare id: number

    @Column()
    declare email: string

    @Column()
    declare password: string

}