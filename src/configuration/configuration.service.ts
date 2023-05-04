import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ConfigurationRepository } from '../data/repositories/configuration.repository';

@Injectable()
export class ConfigurationService {
  constructor(private repository: ConfigurationRepository) {}

  async create(createConfigurationDto: CreateConfigurationDto) {
    let isCreated = await this.repository.createOne(createConfigurationDto);

    if (isCreated) {
      return {
        message: 'Configuration created successfully',
        status: 201,
      };
    } else {
      return {
        message: 'Configuration not created',
        status: 400,
      };
    }
  }
  async findAll() {
    return await this.repository.findMany();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async update(id: number, updateConfigurationDto: UpdateConfigurationDto) {
    let isUpdated = await this.repository.updateOne(id, updateConfigurationDto);

    if (isUpdated) {
      return {
        message: 'Configuration updated successfully',
        status: 201,
      };
    } else {
      return {
        message: 'Configuration not updated',
        status: 400,
      };
    }
  }

  async selectLastConfiguration() {
    return await this.repository
      .createQueryBuilder('configuration')
      .limit(1)
      .orderBy('configuration.id', 'DESC')
      .getOne();
  }

  async remove(id: number) {
    let isDeleted = await this.repository.delete(id);

    if (isDeleted) {
      return {
        message: 'Configuration deleted successfully',
        status: 201,
      };
    } else {
      return {
        message: 'Configuration not deleted',
        status: 400,
      };
    }
  }
}
