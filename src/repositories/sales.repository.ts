import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import 'moment/locale/es-do';

import { EntityRepository, Repository, getManager } from 'typeorm';
import { Sales } from './../entities/sales.entity';
import { Users } from './../entities/users.entity';
import { CreateSaleDto } from './../sales/dto/create-sale.dto';
@EntityRepository(Sales)
export class SalesRepository extends Repository<Sales> {
  private dataSource = getManager();

  async createSale(dto: CreateSaleDto) {
    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

    dto.cash = Number(dto.cash.replace(/[^0-9.-]+/g, '')); //Remove later, it is not a good practice
    dto.discount = Number(dto.discount.replace(/[^0-9.-]+/g, '')); //Remove later, it is not a good practice

    dto.total = dto.cash - dto.discount;

    let isCreated = await this.save(dto);

    if (isCreated) {
      let horaVenta = moment(isCreated.createdAt).format('LTS');
      let fechaVenta = moment(isCreated.createdAt).format('LL');
      console.log(horaVenta);
      return {
        data: {
          sale: {
            nombreCliente: 'Pedro',
            horaVenta: horaVenta,
            fechaVecha: fechaVenta,
            productList: [],
            vemta: {
              ventaTotal: isCreated.total.toFixed(2),
              descuento: isCreated.discount.toFixed(2),
              efectivo: isCreated.cash.toFixed(2), //Remove later, it is not a good practice
              atentidoPor: isCreated.user.full_name,
            },
          },
          success: true,
          code: HttpStatus.ACCEPTED,
          message: 'Sale made successfully.',
        },
      };
    }
    return {
      data: {
        success: false,
        code: HttpStatus.CONFLICT,
        message: 'The sale could not be made.',
      },
    };
  }

  async finAll() {
    return this.createQueryBuilder('sales')
 
    .leftJoinAndSelect('sales.user', 'user')
    .getMany();
  }
}
