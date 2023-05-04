import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from '../data/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.repository.saveOne(createCategoryDto);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOneById(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.repository.updateOne(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.repository.removeOne(id);
  }
}
