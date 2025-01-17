// entities/voucher.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Vouchers')
export class Voucher {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  VoucherCode: string;

  @Column({ type: 'timestamp', nullable: true })
  ValidatedOn: Date | null;

  @Column()
  WorkspaceId: number;

  @Column()
  WinningChallengeId: number;

  @Column()
  CreatedById: number;

  @Column({ type: 'timestamp' })
  CreatedOn: Date;

  @Column()
  LastModifiedById: number;

  @Column({ type: 'timestamp' })
  LastModifiedOn: Date;

  @Column()
  SubmissionId: number;

  @Column()
  VoucherPrize: string;

  @Column()
  VoucherPrizeEn: string;
}
