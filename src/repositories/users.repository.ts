import { EntityRepository, Repository } from 'typeorm';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Users } from '../entities/users.entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }

  async saveOne(dto: CreateUserDto) {
    return await this.save(dto);
  }

  async findAll() {
    return await this.find();
  }

  async findById(id: number) {
    return await this.findOne(id);
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    let isUpdate = await this.update(id, dto);
    if (isUpdate) {
      return {
        ok: true,
        msg: 'actualizado con éxito.',
      };
    }
  }

  async register(dto: { email: string; password: string }) {
    return await this.save(dto);
  }

  async removeOne(id: number) {
    let isDeleted = await this.delete(id);

    if (isDeleted) {
      return {
        ok: true,
        msg: 'Eliminado con éxito.',
      };
    }
  }
}
