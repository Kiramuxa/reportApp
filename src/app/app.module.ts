import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CrmModule } from './crm/crm.module';
import { ModelModule } from './model/model.module';
import { AppComponent } from './app.component';
import { ReportListComponent } from './crm/report-list/report-list.component';
import { RouterModule } from '@angular/router';

const ROUTES = [
  { path: 'report', component: ReportListComponent }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CrmModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
