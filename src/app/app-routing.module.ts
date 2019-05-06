import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaAlojamientoComponent } from './components/alta-alojamiento/alta-alojamiento.component';

const routes: Routes = [
  {
    path: 'altaAlojamiento',
    component: AltaAlojamientoComponent
  },
  {
      path: '**',
      redirectTo: '/altaAlojamiento',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
