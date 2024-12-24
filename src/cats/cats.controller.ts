import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return { data: this.catsService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Post()
  create(@Body() cat) {
    return this.catsService.create(cat);
  }
}