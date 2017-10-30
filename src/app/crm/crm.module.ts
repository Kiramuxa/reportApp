import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModelModule } from '../model/model.module';
import { DateValueAccessorDirective } from '../directives/date-value-accessor.directive';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { ReportDetailComponent } from './report-list/report-detail/report-detail.component';
import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
  imports: [ CommonModule, ModelModule, ReactiveFormsModule ],
  declarations: [CrmComponent, NavComponent, ContentComponent, ReportDetailComponent, ReportListComponent, DateValueAccessorDirective ],
  exports: [ CrmComponent ]
})
export class CrmModule { }
