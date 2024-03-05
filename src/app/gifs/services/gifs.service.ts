import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //servicio de uso global
})
export class GifsService {
  
  private api_key:string = 'zIQcxDqJ1RGQAKh9SkdK0PbxjKJIVQYB';
  servicioUrl:string='http://api.giphy.com/v1/gifs'
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

    const params= new HttpParams()
    .set('api_key',this.api_key)
    .set('limit','10')
    .set('q',query);
    
    
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params } )
    .subscribe((resp) => {
      console.log(resp.data)  
      this.resultados=resp.data
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
      
    });
    //console.log(this._historial);

  }

}
