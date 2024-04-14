import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './component/template/template.component';


const routes: Routes = [
  {
    path:'', component: TemplateComponent,
    children:[
      {
        path:'reservas', loadChildren:()=> import("./../reservas/reservas.module").then(x=>x.ReservasModule)
      },

    ]
  
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
