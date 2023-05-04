import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonRepository } from '../data/repositories/person.repository';

@Injectable()
export class PersonService {
  constructor(private repository: PersonRepository) {}

  async create(createPersonDto: CreatePersonDto) {
    return await this.repository.createOne(createPersonDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOneById(id);
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    return await this.repository.updateOne(id, updatePersonDto);
  }

  async remove(id: number) {
    return await this.repository.deleteOne(id);
  }
}
