import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../data/repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private repository: ProductRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.repository.saveOne(createProductDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOneById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.repository.updateOne(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.repository.deleteOne(id);
  }
}
