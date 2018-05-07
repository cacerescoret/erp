import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../servicios/articulos.service';

@Component({
  selector: 'app-listado-articulos',
  templateUrl: './listado-articulos.component.html',
  styleUrls: ['./listado-articulos.component.css']
})
export class ListadoArticulosComponent implements OnInit {

  articulos:any;
  id:string;

  constructor(private articulosService: ArticulosService) { }

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos(){
    this.articulosService.getArticulos()
                  .subscribe((res:any)=>{
                    this.articulos = res.articulos;
                  });
  }

  obtenerId(id){
    this.id = id;
  }

  borrarArticulo(){
    this.articulosService.deleteArticulo(this.id)
                  .subscribe((res:any)=>{
                    this.cargarArticulos();
                  }, (error)=>{
                    console.log(error);
                  })
  }

}
