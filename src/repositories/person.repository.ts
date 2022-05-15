import { UpdatePersonDto } from './../person/dto/update-person.dto';
import { EntityRepository, Repository, getManager } from 'typeorm';
import { CreatePersonDto } from './../person/dto/create-person.dto';
import { Person } from './../entities/person.entity';
import { Users } from './../entities/users.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  private dataSource = getManager();

  findByName(clientName: string) {
    return this.findOne({ where: { clientName } });
  }

  async createOne(dto: CreatePersonDto) {
    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

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
    return this.createQueryBuilder('person')
      .leftJoinAndSelect('person.user', 'user')
      .getMany();
  }

  async findOneById(id: number) {
    let isFind = await this.createQueryBuilder('person')
      .leftJoinAndSelect('person.user', 'user')
      .where('person.id = :personId', { personId: id })
      .getMany();

    if (isFind[0] !== undefined) {
      return isFind[0];
    }
  }

  async updateOne(id: number, dto: UpdatePersonDto) {
    let isUpdate = await this.update(id, dto);

    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

    if (isUpdate) {
      return {
        data: {
          success: true,
          message: `Person ${dto.full_name} updated successfully.`,
        },
      };
    }
    return {
      data: {
        success: false,
        message: 'The person  could not be updated.',
      },
    };
  }

  async deleteOne(id: number) {
    let isDeleted = await this.delete(id);

    if (isDeleted) {
      return {
        data: {
          success: true,
          message: 'Person removed successfully.',
        },
      };
    }
    return {
      data: {
        success: false,
        message: 'The person could not be removed.',
      },
    };
  }
}
