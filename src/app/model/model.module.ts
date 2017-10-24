import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRepository } from './report.repository';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    ReportRepository
  ]
})
export class ModelModule { }
