import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './test/test.controller';
import { CouponModule } from './coupon/coupon.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { SubmissionModule } from './submission/submission.module';


@Module({
  imports: [CouponModule, WorkspaceModule, SubmissionModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
