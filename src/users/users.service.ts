import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '../repositories/users.repository';
import { Users } from './../entities/users.entity';
import { Register } from './../inferfaces/register.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashPassword(createUserDto.password);
    createUserDto.password = hash;
    createUserDto.created_at = new Date();
    createUserDto.updated_at = new Date();
    return await this.usersRepository.saveOne(createUserDto);
  }

  async register(createUserDto: Register) {
    const hash = await this.hashPassword(createUserDto.password);
    createUserDto.password = hash;

    return await this.usersRepository.register(createUserDto);
  }

  async findOneByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findByEmail(email);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.updateOne(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.removeOne(id);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
