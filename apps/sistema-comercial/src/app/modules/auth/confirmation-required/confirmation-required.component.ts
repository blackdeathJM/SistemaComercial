import { Component, ViewEncapsulation } from '@angular/core';
import {fuseAnimations} from '@s-fuse/public-api';

@Component({
    selector     : 'auth.ts-confirmation-required',
    templateUrl  : './confirmation-required.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationRequiredComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
