import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './test/test.controller';


@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
