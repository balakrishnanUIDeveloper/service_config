import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
export interface canDeactivateComponent {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
    providedIn: 'root'
})

export class canDeactivateGaurd implements CanDeactivate<canDeactivateComponent>{
    canDeactivate(component: canDeactivateComponent) {
        return component.canDeactivate ? component.canDeactivate() : true
    }
}