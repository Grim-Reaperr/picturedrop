import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './test/test.controller';
import { CouponModule } from './coupon/coupon.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { Workspace} from './workspace/entities/workspace.entity';
import { SubmissionItemModule } from './submission/submission.module';
import { SubmissionItem} from './submission/entities/submission.entity'



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      entities: [SubmissionItem,Workspace],
      synchronize: false,
      
    }),
   // CouponModule,
    WorkspaceModule,
    SubmissionItemModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
