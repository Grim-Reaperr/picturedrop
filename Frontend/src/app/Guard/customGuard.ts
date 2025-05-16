import {AuthGuardData, createAuthGuard} from 'keycloak-angular';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';


const isAccessAllowed = async(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    authData: AuthGuardData
  ):Promise<boolean> => {
  const {authenticated, grantedRoles, keycloak} = authData;

  if (!authenticated) {
    await keycloak.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  return true;
}

export const canActivate = createAuthGuard<CanActivateFn>(isAccessAllowed);
