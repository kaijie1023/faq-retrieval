import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(private faqService: FaqsService) {}

  @Post()
  create(@Body() dto) {
    return this.faqService.create(dto);
  }

  @Get()
  list() {
    return this.faqService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.faqService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto) {
    return this.faqService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.faqService.remove(Number(id));
  }

  @Post('/ask')
  ask(@Body() body) {
    const { text } = body;
    return this.faqService.ask(text);
  }
}
