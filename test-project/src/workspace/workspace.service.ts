// /workspace/workspace.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceDto } from './dto/workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
  ) {}

  // Alle Workspaces mit relevanten Feldern abrufen
  async findAll(): Promise<WorkspaceDto[]> {
    const workspaces = await this.workspaceRepository.find({
      select: [
        'Id', 'SubscriptionStatus', 
      ]
    });

    return workspaces.map(workspace => ({
      Id: workspace.Id,   
      SubscriptionStatus: workspace.SubscriptionStatus,
    }));
  }

  // Workspaces nach SubscriptionStatus gruppieren (Aktiv / Inaktiv)
  async groupBySubscriptionStatus(): Promise<any> {
    const workspaces = await this.findAll();

    const groupedData = {
      active: 0,
      inactive: 0
    };

    workspaces.forEach(workspace => {
      const status = workspace.SubscriptionStatus;
      if (status === 'Active' || status === 'SessionPending') {
        groupedData.active += 1;
      } else if (status === 'Canceled' || status === 'Unpaid') {
        groupedData.inactive += 1;
      }
    });

    return groupedData;
  }
}
