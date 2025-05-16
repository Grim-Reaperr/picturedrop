import { Routes } from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {UploadsComponent} from './uploads/uploads.component';
import {HomeComponent} from './home/home.component';
import {CouponsComponent} from './coupons/coupons.component';
import {canActivate} from './Guard/customGuard';


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'workspace', component: WorkspaceComponent, canActivate: [canActivate]},
  {path:'uploads', component: UploadsComponent, canActivate: [canActivate]},
  {path:'coupons', component: CouponsComponent, canActivate: [canActivate]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
