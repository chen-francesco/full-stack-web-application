import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aziende',
  templateUrl: './aziende.component.html',
  styleUrls: ['./aziende.component.css']
})
export class AziendeComponent {
  

  data: {'ID': number, 'TipoIntervento' : string, 'Spesa' : number, 'Componenti' : string, 'nascondi' : boolean}[] = [];

  TipoIntervento : string;
  Spesa : number;
  Componenti : string;

  constructor(public http:HttpClient) {
    this.raccogli()
  }
  
  raccogli () {
    this.data = []
    this.http.get<any[]>('http://127.0.0.1:8080/V_Azienda').subscribe((response) => {
      response.forEach(x => {
        x['nascondi'] = true;
        this.data.push(x);
      });
    })
  }

  inserisci () { 
    let url : string = 'http://127.0.0.1:8080/V_Azienda/'
    let dati : {'TipoIntervento' : string, 'Spesa' : number, 'Componenti' : string} = {'TipoIntervento' : this.TipoIntervento, 'Spesa' : this.Spesa, 'Componenti' : this.Componenti}
    this.TipoIntervento = '';
    this.Spesa = 0;
    this.Componenti = '';
    this.http.post(url, dati).subscribe(data => {
      console.log(data)
    })
    this.refresh()
  }

  edita (id : number) {
    this.data.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
      }
    });
  }

  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/V_Azienda/' + id.toString()
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
    let url : string = 'http://127.0.0.1:8080/V_Azienda/' + id.toString()
    this.data.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'Esito': string}>(url,{'TipoIntervento' : x.TipoIntervento, 'Spesa' : x.Spesa, 'Componenti' : x.Componenti}).subscribe((x)=> { 
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
