import { UserRepository } from './../repositories/users.repository';
import { CategoryRepository } from './../repositories/category.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './../repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      CategoryRepository,
      UserRepository,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
