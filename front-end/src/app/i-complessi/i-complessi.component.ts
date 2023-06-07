import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-i-complessi',
  templateUrl: './i-complessi.component.html',
  styleUrls: ['./i-complessi.component.css']
})

export class IComplessiComponent {

  data: {'IDIntervento': number, 'IDAzienda' : number, 'nascondi' : boolean}[] = [];

  IDIntervento : number;
  IDAzienda : number;

  constructor(public http:HttpClient) {
    this.raccogli()
  }
  
  raccogli () {
    this.data = []
    this.http.get<any[]>('http://127.0.0.1:8080/V_iComplesso').subscribe((response) => {
      response.forEach(x => {
        x['nascondi'] = true;
        this.data.push(x);
      });
    })
  }

  inserisci () { 
    let url : string = 'http://127.0.0.1:8080/V_iComplesso/'
    let dati : {'IDIntervento' : number, 'IDAzienda' : number} = {'IDIntervento' : this.IDIntervento, 'IDAzienda' : this.IDAzienda}
    this.IDAzienda = 0
    this.IDIntervento = 0
    this.http.post(url, dati).subscribe(data => {
      console.log(data)
    })
    this.refresh()
  }

  edita (id : number) {
    this.data.forEach(x => {
      if (x.IDIntervento == id) {
        x['nascondi'] = !x.nascondi;
      }
    });
  }

  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/V_iComplesso/' + id.toString()
    this.http.delete<{'Esito': string}>(url).subscribe(
      (x) =>{
        if (x['Esito'] == "Positivo" ) { 
          alert('Delete avvenuto con succeso')
          this.refresh()
        }
      }
    )
  }

  modifica (id : number) {
    let url : string = 'http://127.0.0.1:8080/V_iComplesso/' + id.toString()
    this.data.forEach(x => {
      if (x.IDIntervento == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'Esito': string}>(url,{'IDIntervento' : x.IDIntervento, 'IDAzienda' : x.IDAzienda}).subscribe((x)=> { 
          if (x['Esito'] == "Positivo" ) { 
            alert('Update avvenuto con succeso')
          }
        })
        
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
