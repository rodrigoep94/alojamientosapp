import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaAlojamientoComponent } from './components/alta-alojamiento/alta-alojamiento.component';
import { AppHeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListadoAlojamientoComponent } from './components/listado-alojamiento/listado-alojamiento.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaAlojamientoComponent,
    AppHeaderComponent,
    ListadoAlojamientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
