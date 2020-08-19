import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';
import { Product } from './product.entity'

@Controller('product')
export class ProductController {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<ProductDTO[]> {
        return await this.productService.findAll();
    }

    @Post()
    async createProduct(@Body() productDTO: ProductDTO) {
        return await this.productService.createProduct(productDTO);
    }

    @Get('/:name')
    async findProduct(@Param() params){
        return await this.productService.findProduct(params.name);
    }

  
    @Patch('/edit/:productId')
    public async editProduct(
        @Body() ProductDto: ProductDTO,
        @Param('productId') productId: number,
    ): Promise<Product> {
        const product = await this.productService.editProduct(
            productId,
            ProductDto,
        );
        return product;
    }

   @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

}
