import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspaceModule } from './workspace/workspace.module';
import { Workspace} from './workspace/entities/workspace.entity';
import { SubmissionItemModule } from './submission/submission.module';
import { SubmissionItem} from './submission/entities/submission.entity'
import { VoucherModule } from './vouchers/vouchers.module';
import { Voucher } from './vouchers/entities/voucher.entity';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard, KeycloakConnectModule, RoleGuard} from "nest-keycloak-connect";


@Module({
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, //By default, it will throw a 401 unauthorized when it is unable to verify the JWT token or Bearer header is missing.
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, //Permissive by default. Used by controller methods annotated with @Roles
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      entities: [SubmissionItem,Workspace,Voucher],
      synchronize: false,
      
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080', //your URL Keycloak server
      realm: 'Test', //realms that used for this app
      clientId: 'private', //client id for this app
      secret: 'Rnlb5VylqgGsAHHXB0KLE9QogiRB2eGT', //secret for this app
    }),
    WorkspaceModule,
    SubmissionItemModule,
    VoucherModule,
  ],
  controllers: [AppController],

})
export class AppModule {}
