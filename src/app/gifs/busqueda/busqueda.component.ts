import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
 
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;   // viewchild ,NOMBRE DEL ELEMTENTO HTML A BUSCAR ID , CLASE.. ! ver


  constructor(private gifsService:GifsService){} //inyectamos  el servicio
  
  buscar(){
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length===0){ //evitar enviar vacios al presionar enter
      return ;
    }

    this.gifsService.buscarGifs(valor);
    
    this.txtBuscar.nativeElement.value='';
  }

}
