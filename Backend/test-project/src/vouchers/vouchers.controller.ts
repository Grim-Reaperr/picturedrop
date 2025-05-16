// controllers/voucher.controller.ts
import { Controller, Get } from '@nestjs/common';
import { VoucherService } from './vouchers.service';
import { VoucherDto } from './dto/voucher.dto';
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('coupons')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @ApiBearerAuth()
  @Get()
  async findAll() {
    return this.voucherService.findAll();
  }
}
