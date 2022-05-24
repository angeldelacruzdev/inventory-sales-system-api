import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './../category/dto/create-category.dto';
import { UpdateCategoryDto } from './../category/dto/update-category.dto';
import { Category } from './../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async saveOne(dto: CreateCategoryDto) {
    dto.created_at = new Date();
    dto.updated_at = new Date();

    let isCreated = await this.save(dto);
    if (isCreated) {
      return {
        data: {
          message: 'Categoría creada con éxito.',
          success: true,
        },
      };
    } else {
      return {
        data: {
          message: 'Categoría no creada.',
          success: false,
        },
      };
    }
  }

  async updateOne(id: number, dto: UpdateCategoryDto) {
    dto.updated_at = new Date();
    let isUpdate = await this.update(id, dto);
    if (isUpdate) {
      return {
        data: {
          message: 'Categoría actualizada con éxito.',
          success: true,
        },
      };
    } else {
      return {
        data: {
          message: 'Categoría no actualizada.',
          success: false,
        },
      };
    }
  }

  async removeOne(id: number) {
    let isDelete = await this.delete(id);
    if (isDelete) {
      return {
        data: {
          message: 'Categoría eliminada con éxito.',
          success: true,
        },
      };
    } else {
      return {
        data: {
          message: 'Categoría no eliminada.',
          success: false,
        },
      };
    }
  }
}
