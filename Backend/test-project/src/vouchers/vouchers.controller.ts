// controllers/voucher.controller.ts
import { Controller, Get } from '@nestjs/common';
import { VoucherService } from './vouchers.service';
import { VoucherDto } from './dto/voucher.dto';

@Controller('coupons')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  async findAll() {
    return this.voucherService.findAll();
  }
}
