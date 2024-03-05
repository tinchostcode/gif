import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //servicio de uso global
})
export class GifsService {
  
  private api_key:string = 'zIQcxDqJ1RGQAKh9SkdK0PbxjKJIVQYB';
  
  private _historial:string[]=[];
  
  public resultados:Gif[]=[]; 


  get historial(){
    return [...this._historial];

  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)|| [];

   }

  buscarGifs(query:string=''){
    query=query.trim().toLocaleLowerCase(); // limpio el query y lo paso a miniscula 

    if (!this.historial.includes(query)){ //validar repetidos en el arreglo de _historial 
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial)); 
    }
    
    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=zIQcxDqJ1RGQAKh9SkdK0PbxjKJIVQYB&q=${query}&limit=10`)
    .subscribe((resp) => {
      console.log(resp.data)  
      this.resultados=resp.data
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
      
    });
    //console.log(this._historial);

  }

}
