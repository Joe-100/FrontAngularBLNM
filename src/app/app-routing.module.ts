import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './guard/auth.guard';
import { TemplateComponent } from './pages/template/component/template/template.component';
import { ListarServiciosComponent } from './pages/reservas/component/listar-servicios/listar-servicios.component';


const routes: Routes = [

  //routeo simple
  {
    path:'', component:WelcomeComponent//loadChildren:()=>import("./pages/template/template.module").then(x=>x.TemplateModule)
  },
  
  {
    path:'prueba', component:PruebaComponent
  },

  {
    path:'404', component:NotFoundComponent
  },

  {
    path:'auth',loadChildren:()=> import("./modulos/auth/auth.module").then(x=>x.AuthModule)
  },

  {
    path:'dashboard',
    canActivate:[authGuard],
    loadChildren:()=> import("./modulos/template/template.module").then(x=>x.TemplateModule)
  },

  {
    path:'processReservation',loadChildren:()=>import("./pages/template/template.module").then(x=>x.TemplateModule)
  },

  {
    path:'resServicio', component:ListarServiciosComponent
  }
  // {
  //   path:'**',redirectTo:'/404'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
