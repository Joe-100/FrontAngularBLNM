import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './component/template/template.component';
import { TemplateFooterComponent } from './component/template-footer/template-footer.component';
import { TemplateHeaderComponent } from './component/template-header/template-header.component';
import { TemplateSidebarComponent } from './component/template-sidebar/template-sidebar.component';


@NgModule({
  declarations: [
    TemplateComponent,
    TemplateFooterComponent,
    TemplateHeaderComponent,
    TemplateSidebarComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
