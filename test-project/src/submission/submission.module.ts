import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionItemService } from './submission.service';
import { SubmissionItemController } from './submission.controller';
import { SubmissionItem } from './entities/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionItem])],
  controllers: [SubmissionItemController],
  providers: [SubmissionItemService],
})
export class SubmissionItemModule {}
