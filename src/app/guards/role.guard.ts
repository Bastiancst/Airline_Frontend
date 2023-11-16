import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoookieService } from '../services/cookie.service';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    sub: string;
    jti: string;
    email: string;
    uid: string;
    ip: string;
    roles: string;
    exp: number;
    iss: string;
    aud: string;
  }

@Injectable({
    providedIn: 'root'
})
  
export class RoleGuard implements CanActivate{
    constructor(private _router: Router, 
                private cookieService: CoookieService){}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token = this.cookieService.getToken();
        if(token){

        const decodedToken = jwtDecode<DecodedToken>(token);
        const rolesArray = decodedToken.roles.split(',').map(role => role.trim());
        
        console.log(rolesArray)

            if (rolesArray) {
                return true;
            }
        }

        this._router.navigate(['/authentication/unauthorized']);
        return false;
    }
}