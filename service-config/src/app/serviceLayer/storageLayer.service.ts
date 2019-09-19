import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataLayer } from './dataLayer.service';

@Injectable({
    providedIn: "root"
})
export class ServiceConfigdataLayer {
    serviceConfigData: Array<any> = [];
    authServiceData = new Subject<any>();
    constructor(private datahandle: DataLayer) { }
    checkfilename(filepath: string) {
        if (!!filepath) {
            let data = filepath.split('/');
            return (data.length > 0) ? data[data.length - 1] : filepath;
        }
    }
    getAuthServiceData() {
        this.datahandle.getcheckerData().subscribe((res: Array<any>) => {
            this.serviceConfigData = res['data'];
            this.authServiceData.next(this.serviceConfigData.slice());
        })
    }
    formatTimeData(f: any) {
        if (f.hasOwnProperty('time') && f.hasOwnProperty('format')) {
            return (!!f.time) ? f.time + ' ' + f.format : '0 Sec';
        }
        return;
    }
    formatFormData(f: any) {
        if (f.hasOwnProperty('ServiceModes')) {
            f['Service Modes'] = [];
            for (let k in f.ServiceModes) {
                if (f.ServiceModes[k]) {
                    f['Service Modes'].push(k)
                }
            }
            delete f['ServiceModes'];
        }
        if (f.hasOwnProperty('SessionTimeout')) {
            f['Session Timeout'] = this.formatTimeData(f['SessionTimeout']);
            delete f['SessionTimeout']
        }
        if (f.hasOwnProperty('SessionCachetimeout')) {
            f['Session Cache timeout'] = this.formatTimeData(f['SessionCachetimeout']);
            delete f['SessionCachetimeout']
        }
        return f;
    }
    getEditServiceData(id: string) {
        for (let service of this.serviceConfigData) {
            if (service.hasOwnProperty('_id') && service._id == id) {
                return service
            }
        }
    }
    reformatEditData(f: string) {
        return { time: f.split(' ')[0], format: f.split(' ')[1] }
    }
    formatEditServiceData(f: any) {
        if (f.hasOwnProperty('Service Modes')) {
            f['ServiceModes'] = {};
            for (let k of f['Service Modes']) {
                f['ServiceModes'][k] = true;
            }
        }
        delete f['Service Modes'];
        f['SessionTimeout'] = (!!f['Session Timeout']) ? this.reformatEditData(f['Session Timeout']) : {};
        delete f['Service Timeout'];
        f['SessionCachetimeout'] = (!!f['Session Cache timeout']) ? this.reformatEditData(f['Session Cache timeout']) : {};
        delete f['Session Cache timeout'];
        return f;
    }
    getresetField() {
        return {
            'Session Timeout': "",
            'Private Key Password': "",
            'Server Certificate': "",
            'Server Key': "",
            'CA ceritficate': "",
            'Verification Depth': "",
            'Client verification mode': "",
            'Use Session cache': false,
            'Session Cache timeout': "",
            'OCSP URI': "",
            "SessionTimeout": {
                'time': "",
                'format': 'Sec'
            },
            "SessionCachetimeout": {
                'time': "",
                'format': 'Sec'
            },
            'On Exceeding SoR counter': "",
            'SoR Error code': ""
        }
    }
    resetOnServiceChange() {
        let format = this.getresetField();
        format['Result Confirmation'] = "";
        format['Service Modes'] = [];
        format['ServiceModes'] = {}
        return format;
    }
}