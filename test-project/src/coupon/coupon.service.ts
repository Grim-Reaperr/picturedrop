import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponItem } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CouponItemService {

  constructor(
    @InjectRepository(CouponItem)
    private couponItemRepository: Repository<CouponItem>,
  ) {}

  /*create(createCouponDto: CreateCouponDto) {
    return 'This action adds a new coupon';
  }*/

  async findAll(): Promise<CreateCouponDto[]> {
    const couponItems = await this.couponItemRepository.find({
      select: ['DescriptionEn', 'CreatedOn'],  // Nur DescriptionEn und CreatedOn abrufen
    });
    return couponItems.map(couponItem => ({
      DescriptionEN: couponItem.DescriptionEn,
      CreatedOn: couponItem.CreatedOn,
    }));
  }

  /*findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }*/
}
