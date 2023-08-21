import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  /**
   * 
   * @param message MESSAGE TO SHOW
   * @param isSuccess INDICATE OF THE MESSAGE IS SUCCESS OR FAIL
   * @param action MESSSAGE TO SHOW IN BUTTON
   */
  open(message: string, isSuccess = true, action = 'OK'): void {
    const options: MatSnackBarConfig = {
      verticalPosition: 'top',
      duration: 3500,
      horizontalPosition: 'center'
    };

    if (!isSuccess) {
      options.panelClass = ['snackbar-error'];
    }

    this._snackBar.open(message, action, options);
  }

  openSnackBar(
    message: string,
    options: MatSnackBarConfig = { verticalPosition: 'top', duration: 3000, horizontalPosition: 'center' },
    action: string = 'OK',
  ): void {
    this._snackBar.open(message, action, options);
  }
}