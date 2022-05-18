import { SalesRepository } from './../repositories/sales.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRepository])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
