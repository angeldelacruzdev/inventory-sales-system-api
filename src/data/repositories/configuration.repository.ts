import { Repository } from 'typeorm';
import { Configuration } from '../../entities/configuration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationDto } from 'src/configuration/dto/create-configuration.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateConfigurationDto } from 'src/configuration/dto/update-configuration.dto';

export class ConfigurationRepository {
  constructor(
    @InjectRepository(Configuration)
    private readonly repository: Repository<Configuration>,
  ) {}

  async createOne(data: CreateConfigurationDto) {
    try {
      const result = this.repository.save(data);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findMany() {
    try {
      const result = await this.repository.find();
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repository.findOne({ where: { id } });
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async updateOne(id: number, dto: UpdateConfigurationDto) {
    try {
      dto.id = id;
      const result = await this.repository.save(dto);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
