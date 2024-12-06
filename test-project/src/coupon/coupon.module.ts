import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponItemService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponItem } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponItem])],
  controllers: [CouponController],
  providers: [CouponItemService],
})
export class CouponModule {}
