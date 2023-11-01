import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoookieService } from '../services/cookie.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate{

    constructor(private _router: Router, 
                private cookieService: CoookieService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.cookieService.getToken()){
            const { roles } = route.data;

            const userRole = this.cookieService.getRole();

            console.log(userRole);
            if (roles && !roles.includes(userRole)) {
                // role not authorized so redirect to home page
                this._router.navigate(['/authentication/unauthorized']);
                console.log('Acceso no autorizado')
                return false;
            }

            return true;
        }

        this._router.navigate(['/authentication/unauthorized']);
        return false;
    }

}