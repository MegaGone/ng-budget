import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SettingsService } from './settings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurrency } from 'app/interfaces';
import { SnackbarService } from 'app/utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, OnDestroy {

  private _unsubscribeAll = new Subject<any>();
  public settingsForm: FormGroup;
  public currencies: ICurrency[];

  constructor(
    private _service: SettingsService,
    private _fb: FormBuilder,
    private _snackbarService: SnackbarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForm();
    this.getCurrencies();
  }
  
  initForm() {
    this.settingsForm = this._fb.group({
      'language': ['', Validators.required],
      'currency': ['', Validators.required],
      'displayName': ['', [Validators.required]],
      'email'   : ['', Validators.required],
      'avatar'  : ['']
    })
  }
  
  /**
   * GET CURRENCIES
   */
  getCurrencies() {
    this._service.getCurrencies().pipe(takeUntil(this._unsubscribeAll)).subscribe(
      res => {
        if (!res.length) return this._snackbarService.open('Something was wrong, please try again.', false);
        this.currencies = res;
      },
      err => this._snackbarService.open('Ooops... An error ocurred, try later.', false) 
    );
  }

  /**
   * DESTROY ALL SUSCRIPTIONS
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
