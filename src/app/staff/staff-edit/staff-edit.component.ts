import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { StaffService } from '../staff.service';

@Component({
  selector: 'dm-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  pageTitle: string = 'Edit Staff';
  selectedDept!: string;
  selectedType!: string;
  myForm!: FormGroup;
  id !: string | null;
  opt!: boolean;

  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackBar: SnackBarService
  ) {
    this.myForm = this._fb.group({
      id: [''],
      dui: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{8}-[0-9]{1}$')]],
      name: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      type: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', [Validators.required, Validators.maxLength(40)]],
      salary: ['', [Validators.required, Validators.min(350)]],
    });
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getStaff(this.id);
  }

  getStaff(id: any) {
    if (!(id === '0')) {
      this._staffService.getSpecifiedStaff(id).subscribe(data => {
        console.log(data);
        this.myForm.setValue(data);
      });
    }
  }

  confirmDialog(message: string, action: string): void {
    this._dialog.open(DialogComponent, {
      data: `${message}`,
      panelClass: 'confirm-dialog-container'
    })
      .afterClosed().subscribe(
        x => {
          if (x) {
            switch (action) {
              case 'add':
                this._staffService.addStaff(this.myForm.value).subscribe(
                  {
                    next: respose => {
                      console.log(respose);
                      console.log('ok');
                    },
                    error: error => {
                      console.log(error);
                      this.openSnackBar('Staff Added', 'Error');
                    },
                    complete: () => {
                      this.openSnackBar('Staff Added', 'Success');
                      this._router.navigateByUrl('/staff');
                    }
                  }
                );
                break;
              case 'update':
                this._staffService.updateStaff(this.myForm.value).subscribe(
                  {
                    next: respose => {
                      console.log(respose);
                    },
                    error: error => {
                      console.log(error);
                      this.openSnackBar('Staff Added', 'Success');
                    },
                    complete: () => { 
                      this.openSnackBar('Staff Edited', 'Success');
                      this._router.navigateByUrl('/staff');
                    }
                  }
                );
                break;
              case 'clear':
                this.clean();
                break;
              default:
                break;
            }
          }
        }
      );
  }

  save(): void {
    if (!(this.id === '0')) {
      //this.openSnackBar('Lorem ipsum dolor sit','Error');
      this.confirmDialog('Are you sure you want to change the data?', 'update');
    } else {
      this.confirmDialog('Ready to Add The Staff?', 'add');
    }
  }

  clean(): void {

  }

  openSnackBar(message: string, type: string): void {
    this._snackBar.openSnackBar(message, '', type);
  }
}
