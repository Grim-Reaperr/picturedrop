import { Controller, Get } from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('cats')
export class CatsController {
  @ApiBearerAuth()
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  
}
