import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';


import { AppModule } from './../src/app.module';
import { ProductDTO } from '../src/product/product.dto';
import { Connection } from 'typeorm';
import { ProductService } from './../src/product/product.service';


describe('AppController (e2e)', () => {
  let app;
  let module: TestingModule;
  let connection: Connection;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    connection = module.get(Connection);
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    module.close();
  });

  afterEach(async () => {
    await connection.synchronize(true);
  });

  it(`/GET product`, () => {
    return request(app.getHttpServer())
        .get('/product') // pass here id, not a string
        .expect(200)
        .expect({
            data: ProductService.findAll(),
    });
});

  it('/product (POST)', () => {
    const productDTO = new ProductDTO();
    productDTO.name = 'laptop';
    productDTO.description = 'Blue';
    productDTO.price = '100'
    return request(app.getHttpServer())
      .post('/product')
      .send(productDTO)
      .expect(201)
      .expect({
        name: 'laptop',
        description: 'Black',
        price: '100',
        id: 1,
      });
  });

});
