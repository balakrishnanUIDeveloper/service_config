import { Injectable } from '@angular/core';
import { WebStorages } from './webstorage.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataLayer } from './dataLayer.service';


@Injectable()
export class UserLoginLayer {
    constructor(private webstorage: WebStorages, private router: Router, private datalayer: DataLayer) { }
    loginData = new Subject<boolean>();
    loginUserData = new Subject<any>();
    checkDefaultPwd = new Subject<boolean>();
    profileInfo: {};
    isLogged: boolean = false;
    setLoggedIn() {
        this.isLogged = true;
        this.loginData.next(this.isLogged);
    }
    checkIsLogged() {
        if (this.webstorage.getLocalSt('JWT')) {
            this.isLogged = true
        }
        this.loginData.next(this.isLogged);
        return this.isLogged;
    }
    logOut() {
        this.isLogged = false;
        this.webstorage.deleteLocalSt('JWT');
        this.webstorage.deleteLocalSt('profileId');
        this.loginData.next(this.isLogged);
        this.router.navigate([''])
    }
    checkuserLog() {
        this.datalayer.checkLogin().subscribe((data: any) => {
            this.loginUserData.next(data);
            if (data['success']) {
                this.profileInfo = data.user;
            }
        })
    }
    getProfileData() {
        return this.profileInfo;
    }
    registerAdminData() {
        let userData = {
            "name": "admin",
            "email": "admin@admin.com",
            "username": "admin",
            "password": "changeme"
        }
        this.datalayer.registerUser(userData).subscribe((data: any) => {
            console.log('register', data)
        })
    }
    checkIfUserAvailable() {
        this.datalayer.checkUser().subscribe((data: any) => {
            if (data.hasOwnProperty('data') && data.data.length <= 0) {
                this.registerAdminData();
            }
        })
    }
}