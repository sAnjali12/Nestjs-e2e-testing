import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  static findAll() {
    throw new Error("Method not implemented.");
  }
  static find() {
    throw new Error("Method not implemented.");
  }
  static findOneOrFail() {
    throw new Error("Method not implemented.");
  }
  static findProduct() {
    throw new Error("Method not implemented.");
  }
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async createProduct(productDTO: ProductDTO) {
        // check if product exists
        const numOfProducts = await this.productRepository.count({where: {name: productDTO.name}});
        if (numOfProducts > 0) { // return exception
            throw new ConflictException();
        } else { // insert product
            const product = new Product();
            product.name = productDTO.name;
            product.description = productDTO.description;
            product.price = productDTO.price
            const savedProduct = await this.productRepository.save(product);
            return savedProduct;
        }

    }

    async findProduct(name: string) {
        return await this.productRepository.find({where: {name}}).catch(() => {
            throw new BadRequestException();
        });
    }

    async  findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async editProduct(
        productId: number,
        createProductDto: ProductDTO,
    ): Promise<Product> {
        const editedProduct = await this.productRepository.findOne(productId);
        if (!editedProduct) {
            throw new NotFoundException('Product not found');
        }
        return this.productRepository.save(editedProduct);
    }


    async deleteProduct(productId: number): Promise<void> {
        await this.productRepository.delete(productId);
    }
}
