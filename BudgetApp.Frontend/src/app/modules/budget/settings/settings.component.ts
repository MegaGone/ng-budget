import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SettingsService } from './settings.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurrency, ILanguage } from 'app/interfaces';
import { searchByLowerCaseText, SnackbarService } from 'app/utils';

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
  public languages: ILanguage[];
  public currenciesFiltered = new ReplaySubject<ICurrency[]>(1);

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
    this.getLanguages();
  }

  initForm() {
    this.settingsForm = this._fb.group({
      'language': ['', Validators.required],
      'currency': ['', Validators.required],
      'displayName': ['', [Validators.required]],
      'email': ['', Validators.required],
      'avatar': ['']
    })
  }

  /**
   * GET CURRENCIES
   */
  getCurrencies() {
    this._service.getCurrencies().pipe(takeUntil(this._unsubscribeAll)).subscribe(
      res => {
        if (!res.length) return this._snackbarService.open('Something was wrong with the currencies, please try again.', false);
        this.currencies = res;
        this.currenciesFiltered.next([...this.currencies]);
      },
      err => this._snackbarService.open('Ooops... An error ocurred with the currencies, try later.', false)
    );
  }

  /**
   * 
   * @param value VALUE TO FILTER
   */
  onFilterCurrency(value: string): void {
    const result = value ? this.currencies.filter(it => searchByLowerCaseText(it.country, value)) : [...this.currencies];
    this.currenciesFiltered.next(result);
  }

  getLanguages() {
    this._service.getLanguages().pipe(takeUntil(this._unsubscribeAll)).subscribe(
      langs => {

        if (!langs.length) return this._snackbarService.open('Something was wrong with the languages, please try again.', false);
        this.languages = langs;
        console.log(this.languages);
        
      },
      err => this._snackbarService.open('Ooops... An error ocurred with the languages, try later.', false)
    )
  }

  /**
   * DESTROY ALL SUSCRIPTIONS
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
