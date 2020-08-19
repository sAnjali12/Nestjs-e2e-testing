import {Length} from 'class-validator'

export class ProductDTO {
    @Length(1, 255)
    name: string;

    @Length(1, 64)
    description: string;

    @Length(1,10000)
    price: string
}