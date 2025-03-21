import { Routes } from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {UploadsComponent} from './uploads/uploads.component';
import {HomeComponent} from './home/home.component';
import {CouponsComponent} from './coupons/coupons.component';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'workspace', component: WorkspaceComponent},
  {path:'uploads', component: UploadsComponent},
  {path:'coupons', component: CouponsComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
