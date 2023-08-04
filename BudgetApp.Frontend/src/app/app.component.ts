import { Component, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    animations : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
