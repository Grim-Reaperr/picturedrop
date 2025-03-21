import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CouponsComponent} from './coupons/coupons.component';
import {WorkspaceComponent} from './workspace/workspace.component';
import {UploadsComponent} from './uploads/uploads.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, CouponsComponent, WorkspaceComponent, UploadsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'picDrop';
}
