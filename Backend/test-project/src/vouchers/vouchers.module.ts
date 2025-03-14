// modules/voucher.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { VoucherService } from './vouchers.service';
import { VoucherController } from './vouchers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  providers: [VoucherService],
  controllers: [VoucherController],
})
export class VoucherModule {}
