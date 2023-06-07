import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
