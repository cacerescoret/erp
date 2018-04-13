import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../servicios/facturas.service';

@Component({
  selector: 'app-listado-fra',
  templateUrl: './listado-fra.component.html',
  styleUrls: ['./listado-fra.component.css']
})
export class ListadoFraComponent implements OnInit {

  facturas:any;
  id:string;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas(){
    this.facturasService.getFacturas()
               .subscribe((resp:any)=>{
                  this.facturas = resp.facturas;
               }, error => {
                 console.log(error);
               })
  }


  obtenerId(id){
    this.id = id;
  }

  borrarFactura(){
    this.facturasService.deleteFactura(this.id)
                .subscribe((resp:any)=>{
                  this.cargarFacturas();
                },(error:any)=>{
                  console.log(error);
                })
  }

}
