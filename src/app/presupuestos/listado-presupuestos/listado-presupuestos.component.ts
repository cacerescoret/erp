import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-listado-presupuestos',
  templateUrl: './listado-presupuestos.component.html',
  styleUrls: ['./listado-presupuestos.component.css']
})
export class ListadoPresupuestosComponent implements OnInit {

  presupuestos:any;
  id:string;

  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.cargarPresupuestos();
  }

  cargarPresupuestos(){
    this.presupuestosService.getPresupuestos()
               .subscribe((resp:any)=>{
                  this.presupuestos = resp.presupuestos;
               }, error => {
                 console.log(error);
               })
  }


  obtenerId(id){
    this.id = id;
  }

  borrarPresupuesto(){
    this.presupuestosService.deletePresupuesto(this.id)
                .subscribe((resp:any)=>{
                  this.cargarPresupuestos();
                },(error:any)=>{
                  console.log(error);
                })
  }

}
