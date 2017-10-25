import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { ReportListComponent } from './reports/report-list/report-list.component';

@NgModule({
  imports: [ CommonModule, ModelModule, ReactiveFormsModule ],
  declarations: [CrmComponent, NavComponent, ContentComponent, ReportsComponent, ReportDetailComponent, ReportListComponent ],
  exports: [ CrmComponent ]
})
export class CrmModule { }
