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

  async findOneById(id: number) {
    return await this.findOne(id);
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    let isUpdate = await this.update(id, dto);
    if (isUpdate) {
      return {
        data: {
          message: 'User updated successfully',
          success: true,
        },
      };
    } else {
      return {
        data: {
          message: 'User not updated',
          success: false,
        },
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
        data: {
          message: 'User deleted successfully',
          success: true,
        },
      };
    } else {
      return {
        data: {
          message: 'User not deleted',
          success: false,
        },
      };
    }
  }
}
