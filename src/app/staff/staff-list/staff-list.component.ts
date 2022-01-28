import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { IStaff } from '../staff';
import { StaffService } from '../staff.service';

@Component({
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  pageTitle: string = 'Staff List';
  staff!: IStaff[];
  errorMessage = '';
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<IStaff>;
  hideSpin: boolean = true;
  myForm!: FormGroup;
  selectedDept!: string;
  selectedType!: string;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _service: StaffService,
    private _route: Router,
    private _snackBar: SnackBarService,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.readStaff();
  }

  readStaff(): void {
    this._service.getStaff().subscribe({
      next: data => {
        this.staff = data;
        this.dataSource = new MatTableDataSource(this.staff);
        this.displayedColumns = Object.keys(this.staff[0]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.displayedColumns.push('Actions');
        this.displayedColumns.forEach((element, index) => {
          if (element === 'id' || element === 'lastName') {
            this.displayedColumns.splice(index, 1)
          }
        });
        console.log(this.displayedColumns)
        console.log(this.dataSource.data);
      },
      error: err => {
        console.log(err);
        this.openSnackBar('Error obtaining Data', 'Error')
        setTimeout(() => {
          this.hideSpin = false;
          this._route.navigateByUrl('**');
        },
        500);
      },
      complete: () => {
        this.hideSpin = false;
        this.openSnackBar('Data loaded', 'Success');
      }
    })
  }

  deleteStaff(id: string): void {
    this._dialog.open(DialogComponent, {
      data: 'Do you want to delete this data?',
      panelClass: 'confirm-dialog-container'
    }).afterClosed().subscribe(
      x =>{
        if(x){
          this._service.deleteStaff(id).subscribe(
            {
              error: e => {
                console.log(e);
                this.openSnackBar('Error when Deleting', 'Error');
              },
              complete: () =>{
                this.openSnackBar('Data Deleted', 'Success');
                this.readStaff();
              }
            }
          );
          this.readStaff();
        }
      }
    );
  }

  openSnackBar(message: string, type: string): void {
    this._snackBar.openSnackBar(message, '', type);
  }
}
