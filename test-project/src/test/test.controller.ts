import { Controller, Get } from '@nestjs/common';

@Controller('c*')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  
}
