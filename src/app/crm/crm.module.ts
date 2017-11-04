import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ReportDetailComponent } from './report-list/report-detail/report-detail.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportTotalInfoComponent } from './report-list/report-total-info/report-total-info.component';
import { RouterModule } from '@angular/router';

const ROUTES = [
  { path: 'report', component: ReportListComponent }
];
@NgModule({
  imports: [
    CommonModule,
    ModelModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    CrmComponent,
    NavComponent,
    ReportDetailComponent,
    ReportListComponent,
    ReportTotalInfoComponent
  ],
  exports: [ CrmComponent ]
})
export class CrmModule { }
