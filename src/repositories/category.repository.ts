import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from './../category/dto/create-category.dto';
import { UpdateCategoryDto } from './../category/dto/update-category.dto';
import { Category } from './../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async saveOne(dto: CreateCategoryDto) {
    dto.created_at = new Date();
    dto.updated_at = new Date();

    return await this.save(dto);
  }

  async updateOne(id: number, dto: UpdateCategoryDto) {
    dto.updated_at = new Date();
    let isUpdate = await this.update(id, dto);
    if (isUpdate) {
      return {
        ok: true,
        msg: 'Actualizado con éxito.',
      };
    }
  }

  async removeOne(id: number) {
    let isDelete = await this.delete(id);
    if (isDelete) {
      return {
        ok: true,
        msg: 'Eliminado con éxito.',
      };
    }
  }
}
