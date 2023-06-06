import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-i-complessi',
  templateUrl: './i-complessi.component.html',
  styleUrls: ['./i-complessi.component.css']
})
export class IComplessiComponent {

  obs: Observable<any[]>;
  id: string;
  data: {'ID': number, 'DataOra' : string, 'Nota' : string, "Report" : string}[] = [];

  //ATTENZIONE: l'url deve finire con lo slash (ovvero: /)
  URL: string = 'https://9743-2001-b07-a99-77f0-6128-476e-3c56-cb10.ngrok-free.app/';
  headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'test').set('Content-Type', 'application/json');

  constructor(private http:HttpClient) {
    this.obs = this.http.get<any[]>(this.URL + "GET/V_interventi", {headers: this.headers});
    this.obs.subscribe(
      data => {
        this.data = data; 
      }, 
      error => alert (error));
  }

  inserisci () {

  }

  modifica () {
    console.log('ciao')
  }

  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_Vasca'
    this.http.delete(url).subscribe(
      (responce) =>{
        console.log(responce)
      }
    )
  }
}
