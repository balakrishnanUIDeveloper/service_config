import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataLayer } from './dataLayer.service';
import { UserLoginLayer } from './userLogin.service';

@Injectable()
export class Authorization implements CanActivate {
    constructor(private dataLayer: DataLayer, private router: Router, private userLayer: UserLoginLayer) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.userLayer.checkIsLogged()) {
            return this.userLayer.checkIsLogged();
        }
        else {
            this.router.navigate(['']);
            return false
        }
    }

}