import { Test, TestingModule } from '@nestjs/testing';
import { CouponItemService } from './coupon.service';

describe('CouponService', () => {
  let service: CouponItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponItemService],
    }).compile();

    service = module.get<CouponItemService>(CouponItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
