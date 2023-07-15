import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { IHeaderOptions, IUser } from 'app/interfaces';
import { AuthService } from 'app/modules';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  public user: IUser;

  constructor(
    private _authService: AuthService
  ) {
    this.options = HEADER_OPTIONS;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._authService.getCurrentUser().pipe(takeUntil(this._unsubscribeAll)).subscribe(user => this.user = user);
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(false);
    this._unsubscribeAll.complete();
  }

  /**
   * 
   * @param method - Method name to call
   * @returns Call to child method
   */
  callMethod(method: number): void {
    if (!method) return;

    switch (method) {
      case 1: return this._authService.logOut();
    }
  }
}
