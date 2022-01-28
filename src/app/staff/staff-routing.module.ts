import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { StaffResolver } from './staff-resolver.resolver';
import { PageNotFoundComponent } from '../page-not-found.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StaffListComponent,
      }, {
        path: ':id/edit',
        //resolve: { data: StaffResolver },
        component: StaffEditComponent,
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ]),
  ],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
