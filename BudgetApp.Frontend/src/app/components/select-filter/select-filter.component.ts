import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mat-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss']
})
export class SelectFilterComponent implements OnInit {

  private readonly unsubscribeAll = new Subject<boolean>();

  readonly searchInputFormControl = new FormControl('');

  @ViewChild('searchSelectInput', { read: ElementRef, static: true })
  searchSelectInput: ElementRef;

  @Input()
  placeholderLabel = 'Buscar';

  @Output()
  searchValueOutput = new EventEmitter<string>();

  constructor() {
  }

  handleKeydown(event: KeyboardEvent): void {
    event.stopPropagation();
  }

  onClearFilter(): void {
    this.searchInputFormControl.setValue('');
    this.searchSelectInput.nativeElement.focus();
  }

  ngOnInit(): void {
    this.searchInputFormControl
      .valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(value => this.searchValueOutput.emit(value));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }
}
