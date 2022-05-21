import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import 'moment/locale/es-do';
import { Product } from './../entities/product.entity';

import { EntityRepository, Repository, getManager } from 'typeorm';
import { Sales } from './../entities/sales.entity';
import { Users } from './../entities/users.entity';
import { CreateSaleDto } from './../sales/dto/create-sale.dto';
@EntityRepository(Sales)
export class SalesRepository extends Repository<Sales> {
  private dataSource = getManager();

  async createSale(dto: CreateSaleDto) {
    let pruducts = await this.dataSource.findByIds(Product, dto.pruducts);

    let totalInvoice = 0;
    pruducts.forEach((item) => {
      switch (item.unit) {
        case 'libras':
          let kg = 0.454; // es igual a una libras

          let result: any = dto.libras.find(
            ({ product }) => item.id == product,
          );

          let pounds = result.libras * this.roundNumber(item.price_out, 2);

          totalInvoice = totalInvoice + pounds;

          console.log(totalInvoice);

          break;
        case 'unidad':
          totalInvoice = totalInvoice + this.roundNumber(item.price_out, 2);

          break;
        default:
          console.log(`Sorry, we are out of ${item.unit}.`);
      }
    });

    return;
    let user = await this.dataSource.findOne(Users, dto.user);
    dto.user = user;

    dto.cash = Number(dto.cash.replace(/[^0-9.-]+/g, '')); //Remove in the future, it is not a good practice
    dto.discount = Number(dto.discount.replace(/[^0-9.-]+/g, '')); //Remove in the future, it is not a good practice

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
            productList: pruducts,
            vemta: {
              ventaTotal: isCreated.total.toFixed(2),
              descuento: isCreated.discount.toFixed(2),
              efectivo: isCreated.cash.toFixed(2), //Remove in the future, it is not a good practice
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

  /**
   * It takes a number and rounds it to a specified number of decimal places.
   * @param number - The number to be rounded.
   * @param decimals - The number of decimals to round to.
   * @returns A function that takes two arguments, number and decimals.
   */
  roundNumber(number, decimals) {
    var newnumber = new Number(number + '').toFixed(parseInt(decimals));
    return parseFloat(newnumber);
  }
}
