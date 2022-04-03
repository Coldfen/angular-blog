import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthServices} from "./auth.services";

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthServices,
    private _router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    if (this._auth.isAuthenticated()){
      return true
    } else {
      this._auth.logout()
      this._router.navigate(['/admin', 'login'],{
        queryParams: {
          loginAgain: true
        }
      })
      return true
    }

  }

}
