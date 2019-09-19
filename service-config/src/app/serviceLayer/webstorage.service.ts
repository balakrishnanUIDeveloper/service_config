import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebStorages {
    constructor() { }
    getLocalSt(key: string) {
        return localStorage.getItem(key)
    }
    setLocalSt(key: string, value: any) {
        localStorage.setItem(key, value);
    }
    deleteLocalSt(key: string) {
        localStorage.removeItem(key);
    }
}