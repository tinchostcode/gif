import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //servicio de uso global
})
export class GifsService {
  
  private api_key= 'zIQcxDqJ1RGQAKh9SkdK0PbxjKJIVQYB';
  
  private _historial:string[]=[];
  
  public resultados:any[]=[];


  get historial(){
    return [...this._historial];

  }

  constructor(private http:HttpClient){ }

  buscarGifs(query:string=''){
    query=query.trim().toLocaleLowerCase(); // limpio el query y lo paso a miniscula 

    if (!this.historial.includes(query)){ //validar repetidos en el arreglo de _historial 
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
    }
    
    this.http.get(`http://api.giphy.com/v1/gifs/search?api_key=zIQcxDqJ1RGQAKh9SkdK0PbxjKJIVQYB&q=budokai&limit=12`)
    .subscribe((resp:any) => {
      console.log(resp.data)
      this.resultados=resp.data
      
    });
    //console.log(this._historial);

  }

}
