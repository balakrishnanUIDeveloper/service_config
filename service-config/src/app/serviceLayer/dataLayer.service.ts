import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebStorages } from './webstorage.service';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: "root"
})
export class DataLayer {
    uri = environment.baseUrl;
    constructor(private http: HttpClient, private webstorages: WebStorages) { }
    // no authentication needed function
    noAuth() {
        return ['/authenticate', '/register', '/checkUser'];
    }
    // service config services
    getcheckerData() {
        return this.http.get(`${this.uri}/checkerData`)
    }
    addCheckerData(serviceData: any) {
        return this.http.post(`${this.uri}/checkerData/add`, serviceData);
    }
    updateCheckerData(serviceData: any, id: string) {
        let url = `${this.uri}/checkerData/update/` + id;
        return this.http.put(url, serviceData);
    }
    deleteCheckerData(id: string) {
        let url = `${this.uri}/checkerData/delete/` + id;
        return this.http.delete(url);
    }
    uploadServiceFile(fileData: any) {
        let url = `${this.uri}/checkerData/upload`;
        return this.http.post(url, fileData);
    }
    // system config services
    getSysConfigData() {
        return this.http.get(`${this.uri}/systemConfig`)
    }
    addSysConfigData(serviceData: any) {
        return this.http.post(`${this.uri}/systemConfig/add`, serviceData);
    }
    updateSysConfigData(serviceData: any, id: string) {
        let url = `${this.uri}/systemConfig/update/` + id;
        return this.http.put(url, serviceData);
    }
    uploadFile(fileData: any) {
        let url = `${this.uri}/systemConfig/upload`;
        return this.http.post(url, fileData);
    }
    // login functions
    login(userData: any) {
        return this.http.post(`${this.uri}/user/authenticate`, userData)
    }
    checkLogin() {
        return this.http.get(`${this.uri}/user/profile`)
    }
    changePwd(id: string, pwdData: any) {
        return this.http.put(`${this.uri}/user/changePassword/` + id, pwdData);
    }
    checkUser() {
        return this.http.get(`${this.uri}/user/checkUser`);
    }
    registerUser(userData: any) {
        return this.http.post(`${this.uri}/user/register`, userData);
    }
}