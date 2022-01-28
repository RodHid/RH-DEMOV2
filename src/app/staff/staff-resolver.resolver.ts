import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { IStaff, IStaffResolved } from './staff';
import { StaffService } from './staff.service';

@Injectable({
  providedIn: 'root'
})
export class StaffResolver implements Resolve<IStaffResolved> {

  constructor(private _staffService: StaffService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStaffResolved> {
    const id: any = route.paramMap.get('id');
    if (id !== 0){
      return this._staffService.getSpecifiedStaff(id).pipe(
        map( data => ({staff: data}))
      );
    }else if(id === 0){
      const msg = 'Adding staff';
      return of({ message: msg});
    } else{
      const msg = 'Staff not Found'
      return of({ message: msg});
    }
    
  }
}
