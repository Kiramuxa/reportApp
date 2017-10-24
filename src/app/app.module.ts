import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CrmModule } from './crm/crm.module';
import { ModelModule } from './model/model.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CrmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
