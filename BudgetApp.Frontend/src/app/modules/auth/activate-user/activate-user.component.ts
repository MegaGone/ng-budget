import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styles: [
  ]
})
export class ActivateUserComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<null>;

  constructor(
    private _route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  };

  ngOnInit(): void {
    this.validateOTP();
  };

  private validateOTP() {
    this._route.queryParams.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (params: Params) => {
        const token = params?.token;

        if (!token)
          return console.log("TOKEN NOT VALID");

          console.log("TOKEN", token);
      },
      error: () => {
        console.log("No token found")
      }
    });
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}
