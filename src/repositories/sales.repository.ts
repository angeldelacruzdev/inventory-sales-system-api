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
    /* Getting the products from the database. */
    let pruducts = await this.dataSource.findByIds(Product, dto.pruductsIds);

    let totalInvoice = 0;
    let productList = [];
    let result: any;

    /* A function that is responsible for calculating the total of the invoice. */
    pruducts.forEach((item) => {
      result = dto.sales_products.find(({ product }) => item.id == product);

      if (result.pounds) {
        let pounds = result.pounds * this.roundNumber(item.price_out, 2);
        totalInvoice = totalInvoice + pounds;

        productList.push({
          qty: `${result.pounds} ${item.unit}`,
          total: pounds.toFixed(2),
          impuesto: 0.0,
          productName: item.name,
        });
      }

      if (result.unit) {
        let unit = result.unit * this.roundNumber(item.price_out, 2);
        totalInvoice = totalInvoice + unit;

        productList.push({
          qty: `${result.unit} ${item.unit}`,
          total: unit.toFixed(2),
          impuesto: 0.0,
          productName: item.name,
        });
      }
    });

    /* Getting the users from the database. */
    let users = await this.dataSource.findOne(Users, dto.user);
    dto.user = users;

    dto.cash = totalInvoice;

    dto.products = pruducts;

    let isCreated = await this.save(dto);

    /* A function that is responsible for reducing the inventory of the products that are sold. */
    await this.renameFieldProductSales(dto);

    /* A function that is responsible for returning the data of the sale made. */
    if (isCreated) {
      /* A destructuring assignment. */
      let { saleTime, saleDate } = createTimeAndDate();

      return {
        data: {
          sale: {
            nombreCliente: 'Pedro',
            saleTime,
            saleDate,
            productList,
            sale: {
              saleTotal: totalInvoice.toFixed(2),
              attendedBy: isCreated.user.full_name,
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

    /**
     * It takes a date and time, and returns an object with two properties, one for the time and one for
     * the date.
     * </code>
     * @returns An object with two properties, saleTime and saleDate.
     */
    function createTimeAndDate() {
      let saleTime = moment(isCreated.createdAt).format('LTS');
      let saleDate = moment(isCreated.createdAt).format('LL');
      return { saleTime, saleDate };
    }
  }

  /**
   * It takes an array of objects, and for each object in the array, it calls a function that returns a
   * promise.
   *
   * The function that returns a promise is called `reduceInventoryProduct`.
   *
   * The function `reduceInventoryProduct` is called with two arguments: `id` and `unit`.
   *
   * The `id` and `unit` arguments are taken from the object in the array.
   *
   * The function `reduceInventoryProduct` returns a promise.
   *
   * The function `reduceInventoryProduct` is called for each object in the array.
   *
   * The function `reduceInventoryProduct` is called with the `id` and `unit` arguments taken from the
   * object in the array.
   *
   * The function `
   * @param {CreateSaleDto} dto - CreateSaleDto
   */
  private async renameFieldProductSales(dto: CreateSaleDto) {
    let renameFieldSalesPruduct = [];
    dto.sales_products.map((itemP: any) => {
      if (itemP.pounds) {
        renameFieldSalesPruduct.push({
          id: itemP.product,
          unit: itemP.pounds,
        });
      }
      if (itemP.unit) {
        renameFieldSalesPruduct.push({
          id: itemP.product,
          unit: itemP.unit,
        });
      }
    });

    renameFieldSalesPruduct.forEach(
      async ({ id, unit }: { id: number; unit: string }) => {
        await this.reduceInventoryProduct(id, unit);
      },
    );
  }

  /**
   * Get all sales and join the user table on the userId column.
   * @returns An array of sales objects with the user object nested inside.
   */
  async finAll() {
    return this.createQueryBuilder('sales')
      .leftJoinAndSelect('sales.user', 'user')
      .leftJoinAndSelect("sales.products", "product")
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

  /**
   * This function will reduce the inventory of a product by a given quantity.
   * @param {number} id - number - the id of the product
   * @param {any} qty - number
   */
  private async reduceInventoryProduct(id: number, qty: any) {
    await this.dataSource.decrement(Product, { id: id }, 'inventory_min', qty);
  }
}
