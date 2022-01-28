import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor
    (
      private _snackBar: MatSnackBar
    ) {
  }

  public openSnackBar(message: string, action: string, snackType: string) {
    if (message.includes('loaded')) {
      this._snackBar.openFromComponent(SnackBarComponent, {
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 1500,
        panelClass: `snack-${snackType}`,
        data: { message: message, snackType: snackType }
      });
    } else {
      this._snackBar.openFromComponent(SnackBarComponent, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 1500,
        panelClass: `snack-${snackType}`,
        data: { message: message, snackType: snackType }
      });
    }
  }
}
