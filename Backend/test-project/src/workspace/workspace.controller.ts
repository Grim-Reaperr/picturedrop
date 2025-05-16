// /workspace/workspace.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceDto } from './dto/workspace.dto';
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  // Alle Workspaces abrufen
  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<WorkspaceDto[]> {
    return this.workspaceService.findAll();
  }

  // Workspaces nach SubscriptionStatus gruppieren
  @ApiBearerAuth()
  @Get('grouped-status')
  async getGroupedStatus(): Promise<any> {
    return this.workspaceService.groupBySubscriptionStatus();
  }
}
