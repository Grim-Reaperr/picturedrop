// dto/voucher.dto.ts
export class VoucherDto {
    Id: number;
    VoucherCode: string;
    ValidatedOn: Date | null;
    WorkspaceId: number;
    WinningChallengeId: number;
    CreatedById: number;
    CreatedOn: Date;
    LastModifiedById: number;
    LastModifiedOn: Date;
    SubmissionId: number;
    VoucherPrize: string;
    VoucherPrizeEn: string;
  }
  