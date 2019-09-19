import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebStorages } from './webstorage.service';
import { DataLayer } from './dataLayer.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private webstorages: WebStorages, private datalayer: DataLayer) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        const noAuth: Array<string> = this.datalayer.noAuth();
        for (let key of noAuth) {
            if (request.url.indexOf(key) != -1) {
                return next.handle(request);
            }
        }
        request = request.clone({
            setHeaders: {
                Authorization: `${this.webstorages.getLocalSt('JWT')}`
            }
        });
        return next.handle(request);
    }
}