import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModCandidatoComponent } from './modulos/mod-candidato/mod-candidato.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [];

const pagesRoutes: Routes = [     
  {path: 'candidato',  component: ModCandidatoComponent},  
  {path: '', redirectTo: '/candidato', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(pagesRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
