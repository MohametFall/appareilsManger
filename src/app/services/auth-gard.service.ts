import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGard implements CanActivate{

  constructor(private router :  Router, private authService : AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean{

    if(this.authService.isAuthentified){
      return true;
    }else{
      this.router.navigate(['/auth'])
    }
  }

}
