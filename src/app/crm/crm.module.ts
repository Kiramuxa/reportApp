import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../model/model.module';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ModelModule
  ],
  declarations: [CrmComponent, NavComponent, ContentComponent, ReportListComponent, ReportDetailComponent],
  exports: [
    CrmComponent
  ]
})
export class CrmModule { }
