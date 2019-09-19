import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataLayer } from './dataLayer.service';

@Injectable({
    providedIn: "root"
})
export class SystemConfigStorageLayer {
    systemConfigData: Array<any> = [];
    systemServiceHandle = new Subject<any>();
    constructor(private datahandle: DataLayer) { }
    getsysConfigData() {
        this.datahandle.getSysConfigData().subscribe((data: any) => {
            if (data.code && data.code == "0") {                
                this.systemConfigData = data.data;
                this.systemServiceHandle.next(this.systemConfigData);
            }
            else{
                console.log('error in get service', data);
            }
        })
    }    
}