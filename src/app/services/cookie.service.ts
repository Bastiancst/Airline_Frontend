import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class CoookieService {
    constructor(private http: HttpClient, private cookies: CookieService) {}
    
    setToken(token: string) {
        this.cookies.set("token", token);
    }

    getToken() {
        return this.cookies.get("token");
    }

    setRole(role: any){
        this.cookies.set("role", role);
    }

    getRole(){
        return this.cookies.get("role");
    }
}