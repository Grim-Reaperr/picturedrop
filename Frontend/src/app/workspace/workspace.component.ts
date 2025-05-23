import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Workspace {
  Id: string;
  SubscriptionStatus: string;
}

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  workspaces: Workspace[] = [];
  currentStatus: 'active' | 'inactive' = 'active';
  groupedCounts = { active: 0, inactive: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchGroupedStatus();
    this.fetchWorkspaces();
  }

  fetchGroupedStatus() {
    this.http.get<{ active: number; inactive: number }>('/api/workspace/groupedstatus')
      .subscribe(data => {
        this.groupedCounts = data;
      });
  }

  fetchWorkspaces() {
    this.http.get<Workspace[]>('/api/workspace')
      .subscribe(data => {
        this.workspaces = data;
      });
  }

  get filteredWorkspaces(): Workspace[] {
    return this.workspaces.filter(w =>
      this.currentStatus === 'active'
        ? w.SubscriptionStatus === 'Active' || w.SubscriptionStatus === 'SessionPending'
        : w.SubscriptionStatus === 'Canceled' || w.SubscriptionStatus === 'Unpaid'
    );
  }

  switchStatus(status: 'active' | 'inactive') {
    this.currentStatus = status;
  }
}
