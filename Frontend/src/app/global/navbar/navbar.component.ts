import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import Keycloak from 'keycloak-js';



@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class NavbarComponent {
  constructor(private keycloak: Keycloak) {

  }
  logout() {
    this.keycloak.logout({redirectUri: window.location.origin});
  }
}
