import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, unique: true})
    name: string;

    @Column({length: 64})
    description: string;

    @Column({length:10000})
    price:string
    
    @BeforeInsert()
    private paint() {
        this.description = 'Black'
    }
}