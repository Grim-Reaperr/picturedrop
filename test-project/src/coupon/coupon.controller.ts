import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponItemService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponItemService: CouponItemService) {}

  /*@Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }*/

  @Get()
  findAll() {
    return this.couponItemService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponItemService.update(+id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponItemService.remove(+id);
  }*/
}
