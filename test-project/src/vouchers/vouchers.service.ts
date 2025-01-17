// services/voucher.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
  ) {}

  async findAll() {
    const vouchers = await this.voucherRepository.find({
      select: ['Id', 'ValidatedOn'],
    });

    return vouchers.map(voucher => ({
      Id: voucher.Id,
      ValidatedOn: voucher.ValidatedOn,
    }));
  }
}
