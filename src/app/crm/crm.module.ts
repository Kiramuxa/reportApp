import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CrmComponent, NavComponent, ContentComponent, ReportListComponent],
  exports: [
    CrmComponent
  ]
})
export class CrmModule { }
