import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesRepository } from './../repositories/sales.repository';
@Injectable()
export class SalesService {
  constructor(private repository: SalesRepository) {}

  async create(createSaleDto: CreateSaleDto) {
    return await this.repository.createSale(createSaleDto);
  }

  async findAll() {
    return await this.repository.finAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
