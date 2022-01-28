import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, filter, map, Observable, tap, throwError } from 'rxjs';
import { environment } from "../../environments/environment";
import { IStaff } from './staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  url: string = `${environment.dbBase.toString()}/staff`;

  constructor(private _http: HttpClient) { }

  getStaff(): Observable<IStaff[]> {
    return this._http.get<IStaff[]>(this.url.toString()).pipe(
      delay(500),
      catchError(this.handleError)
    )
  }

  addStaff(staff: IStaff): Observable<IStaff> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(staff);
    return this._http.post<IStaff>(this.url.toString(), staff, { headers }).pipe(
      tap(data => console.log('Created Staff: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  deleteStaff(id: string): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const con = `${this.url.toString()}/${id}`;
    return this._http.delete<IStaff>(con, { headers }).pipe(
      tap(data => console.log(`Deleted Staff with ID: ${id}`)),
      catchError(this.handleError)
    );
  }

  updateStaff(staff: IStaff): Observable<IStaff> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const con = `${this.url.toString()}/${staff.id}`;
    return this._http.put<IStaff>(con, staff, { headers }).pipe(
      tap(() => console.log(`Updated Staff: ${staff.id}`)),
      map(() => staff),
      catchError(this.handleError)
    )
  }

  getSpecifiedStaff(id: any): Observable<IStaff> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const con = `${this.url.toString()}/${id}`;
    return this._http.get<IStaff>(con).pipe(
      tap(() => console.log(`Selected Staff: ${id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
