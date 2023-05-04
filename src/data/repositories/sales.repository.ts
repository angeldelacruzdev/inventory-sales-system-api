import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import 'moment/locale/es-do';
import { Product } from '../../entities/product.entity';

import { EntityRepository, Repository, getManager } from 'typeorm';
import { Sales } from '../../entities/sales.entity';
import { Users } from '../../entities/users.entity';
import { CreateSaleDto } from '../../sales/dto/create-sale.dto';
import { Configuration } from '../../entities/configuration.entity';
import { Person } from '../../entities/person.entity';

@EntityRepository(Sales)
export class SalesRepository extends Repository<Sales> {
  private dataSource = getManager();

  async createSale(dto: CreateSaleDto) {
    /* Getting the products from the database. */
    let pruducts = await this.dataSource.findByIds(Product, dto.pruductsIds);

    //Business setup
    let confinguration = await this.dataSource.findOne(Configuration, 1);

    let custumerNameAndMessage = 'Cliente no registrado';
    if (dto.customer) {
      let customerDb = await this.dataSource.findOne(Person, dto.customer);
      custumerNameAndMessage = customerDb.full_name;
      dto.person = customerDb;
    }

    let totalAmout = 0;
    let productList = [];
    let result: any;

    /* A function that is responsible forcalculate total purchase. */
    ({ result, totalAmout } = this.calculateTotalPurchase(
      pruducts,
      result,
      dto,
      totalAmout,
      productList,
      confinguration,
    ));

    /* Getting the users from the database. */
    let users = await this.dataSource.findOne(Users, dto.user);
    dto.user = users;

    dto.cash = totalAmout;
    dto.products = pruducts; //List products

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
            branch_office: confinguration.name,
            invoice_message: confinguration.invoice_message,
            nombreCliente: custumerNameAndMessage,
            saleTime,
            saleDate,
            productList,
            saleTotal: `${confinguration.currency}$${totalAmout.toFixed(2)}`,
            attendedBy: isCreated.user.full_name,
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

  private calculateTotalPurchase(
    pruducts: Product[],
    result: any,
    dto: CreateSaleDto,
    totalAmout: number,
    productList: any[],
    confinguration: Configuration,
  ) {
    pruducts.forEach((item) => {
      result = dto.sales_products.find(({ product }) => item.id == product);

      let totalAmountProducto =
        result.qty * this.roundNumber(item.price_out, 2);
      totalAmout = totalAmout + totalAmountProducto;

      productList.push({
        qty: `${result.qty} ${item.unit}`,
        total: `${confinguration.currency}$${totalAmountProducto.toFixed(2)}`,
        impuesto: 0.0,
        productName: item.name,
      });
    });
    return { result, totalAmout };
  }

  private async renameFieldProductSales(dto: CreateSaleDto) {
    let renameFieldSalesPruduct = []; //Array of objects

    dto.sales_products.map((itemP: any) => {
      renameFieldSalesPruduct.push({
        id: itemP.product,
        qty: itemP.qty,
      });
    });

    renameFieldSalesPruduct.forEach(
      async ({ id, qty }: { id: number; qty: string }) => {
        await this.reduceInventoryProduct(id, qty); //Reduce the inventory of the product.
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
      .leftJoinAndSelect('sales.products', 'product')
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
    await this.dataSource.decrement(Product, { id: id }, 'inventory_min', qty); //Reduce the inventory of the product.
  }
}
