import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InterventiComponent } from './interventi/interventi.component';
import { IComplessiComponent } from './i-complessi/i-complessi.component';
import { AziendeComponent } from './aziende/aziende.component';

@NgModule({
  declarations: [
    AppComponent,
    InterventiComponent,
    IComplessiComponent,
    AziendeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
