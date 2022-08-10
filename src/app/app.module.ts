import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModCandidatoComponent } from './modulos/mod-candidato/mod-candidato.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ModCandidatoComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CurrencyMaskModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
