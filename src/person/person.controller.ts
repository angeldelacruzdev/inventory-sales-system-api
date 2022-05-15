import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { GetCurrentUserId } from './../common/decorator';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(
    @Body() createPersonDto: CreatePersonDto,
    @GetCurrentUserId() id: number,
  ) {
    createPersonDto.user = id;
    return this.personService.create(createPersonDto);
  }

  @Get()
  async findAll() {
    return await this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePersonDto: UpdatePersonDto,
    @GetCurrentUserId() userId: number,
  ) {
    updatePersonDto.user = userId;
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personService.remove(id);
  }
}
