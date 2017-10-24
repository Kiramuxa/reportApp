import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../model/model.module';
import { CrmComponent } from './crm.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [ CommonModule, ModelModule ],
  declarations: [CrmComponent, NavComponent, ContentComponent ],
  exports: [ CrmComponent ]
})
export class CrmModule { }
