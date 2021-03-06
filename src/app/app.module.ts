import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaAlojamientoComponent } from './components/alta-alojamiento/alta-alojamiento.component';
import { AppHeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListadoAlojamientoComponent } from './components/listado-alojamiento/listado-alojamiento.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotifyService } from './services/notify.service';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { RechazoAlojamientoComponent } from './components/rechazo-alojamiento/rechazo-alojamiento.component';
import { EditarAprobarAlojamientoComponent } from './components/editar-aprobar-alojamiento/editar-aprobar-alojamiento.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaAlojamientoComponent,
    AppHeaderComponent,
    ListadoAlojamientoComponent,
    LoginComponent,
    RegisterComponent,
    ImagenesComponent,
    RechazoAlojamientoComponent,
    EditarAprobarAlojamientoComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    ImagenesComponent,
    RechazoAlojamientoComponent,
    EditarAprobarAlojamientoComponent
  ],
  imports: [
    BrowserModule,
    ShowHidePasswordModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
