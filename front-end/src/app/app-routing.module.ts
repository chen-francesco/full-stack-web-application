import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AziendeComponent } from './aziende/aziende.component';
import { IComplessiComponent } from './i-complessi/i-complessi.component';
import { InterventiComponent } from './interventi/interventi.component';

export const AppRoutes: Routes = [
  { path: 'Interventi', component: InterventiComponent },
  { path: 'Interventi-complessi', component: IComplessiComponent },
  { path: 'Aziende', component: AziendeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }