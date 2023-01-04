import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { IHeaderOptions } from 'app/interfaces';
import { AuthService } from 'app/modules';
import { Subject } from 'rxjs';
import { HEADER_OPTIONS } from 'utils';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {

  public _unsubscribeAll: Subject<boolean>;
  public options: IHeaderOptions[];

  constructor(
    private _authService: AuthService
  ) { 
    this.options = HEADER_OPTIONS;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * 
   * @param method - Method name to call
   * @returns Call to child method
   */
  callMethod(method: number): void {
    if (!method) return;

    switch(method) {
      case 1: return this._authService.logOut();
    }
  }
}
