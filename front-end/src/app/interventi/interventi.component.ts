import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interventi',
  templateUrl: './interventi.component.html',
  styleUrls: ['./interventi.component.css']
})
export class InterventiComponent {
  data: {'ID': number, 'DataOra' : Date, 'Nota' : string, 'Report' : string, 'nascondi' : boolean}[] = [];

  DataOra : Date;
  Nota : string;
  Report : string;

  constructor(public http:HttpClient) {
    this.raccogli()
  }
  
  raccogli () {
    this.data = []
    this.http.get<any[]>('http://127.0.0.1:8080/V_Interventi').subscribe((response) => {
      response.forEach(x => {
        x['nascondi'] = true;
        this.data.push(x);
      });
    })
  }

  inserisci () { 
    let url : string = 'http://127.0.0.1:8080/V_Interventi/'
    let dati : {'DataOra' : Date, 'Nota' : string, 'Report' : string} = {'DataOra' : this.DataOra, 'Nota' : this.Nota, 'Report' : this.Report}
    this.DataOra = new Date("");
    this.Nota = "";
    this.Report = "";
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
    let url : string = 'http://127.0.0.1:8080/V_Interventi/' + id.toString()
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
    let url : string = 'http://127.0.0.1:8080/V_Interventi/' + id.toString()
    this.data.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'Esito': string}>(url,{'DataOra' : x.DataOra, 'Nota' : x.Nota, 'Report' : x.Report}).subscribe((x)=> { 
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
