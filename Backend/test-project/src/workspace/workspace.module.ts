// /workspace/workspace.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
