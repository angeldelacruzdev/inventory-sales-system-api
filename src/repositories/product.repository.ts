import { EntityRepository, Repository, getManager } from 'typeorm';
import { Product } from './../entities/product.entity';
import { CreateProductDto } from './../product/dto/create-product.dto';
import { UpdateProductDto } from './../product/dto/update-product.dto';

import { Category } from './../entities/category.entity';
import { Users } from './../entities/users.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private dataSource = getManager();

  async saveOne(dto: CreateProductDto) {
    let cateory = await this.dataSource.findOne(Category, dto.category);
    dto.category = cateory;

    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

    dto.created_at = new Date();
    dto.updated_at = new Date();
    let isCreated = await this.save(dto);

    if (isCreated) {
      return {
        data: {
          success: true,
          message: 'Product created successfully.',
        },
      };
    }
    return {
      data: {
        success: false,
        message: 'The product could not be created.',
      },
    };
  }

  async findAll() {
    return this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.user', 'user')
      .getMany();
  }

  async findOneById(id: number) {
    let isFind = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.user', 'user')
      .where('product.id = :productId', { productId: id })
      .getMany();

    if (isFind[0] !== undefined) {
      return isFind[0];
    }
  }

  async updateOne(id: number, dto: UpdateProductDto) {
    let isUpdate = await this.update(id, dto);

    let cateory = await this.dataSource.findOne(Category, dto.category);
    dto.category = cateory;

    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

    if (isUpdate) {
      return {
        data: {
          success: true,
          message: 'Product updated successfully.',
        },
      };
    }
    return {
      data: {
        success: false,
        message: 'The product could not be updated.',
      },
    };
  }

  async deleteOne(id: number) {
    let isDeleted = await this.delete(id);

    if (isDeleted) {
      return {
        data: {
          success: true,
          message: 'Product removed successfully.',
        },
      };
    }
    return {
      data: {
        success: false,
        message: 'The product could not be removed.',
      },
    };
  }
}
