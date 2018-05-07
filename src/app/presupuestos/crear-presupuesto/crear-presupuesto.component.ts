import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent implements OnInit {

  formPre: FormGroup;
  presupuesto:any;
  clientes:any;

  constructor(private presupuestosService: PresupuestosService,
              private clientesService: ClientesService,
              private fp: FormBuilder) { }

  ngOnInit() {
    this.cargarClientes();
    this.formPre = this.fp.group({
      cliente: null,
      fecha: null,
      items: this.fp.array([
        this.initItem()
      ]),
      suma: 0,
      tipo: 0.21,
      importeIVA: 0,
      total: 0
    })
    this.cambios();
  }

  cargarClientes(){
    this.clientesService.getTodosClientes()
                      .subscribe((res:any)=>{
                        this.clientes = res.clientes;
                      },(error)=>{
                        console.log(error)
                      })
  }

  initItem(){
    return this.fp.group({
      articulo: null,
      cantidad: null,
      precio: null,
      importe: null
    })
  }

  addItem(){
    const control = <FormArray>this.formPre.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i){
    const control = <FormArray>this.formPre.controls['items'];
    control.removeAt(i)
  }

  redondear(valor){
    var valor;
    if(valor < 0) {
      var resultado = Math.round(-valor*100)/100 * -1;
    } else {
        var resultado = Math.round(valor*100)/100;
    }
    return resultado;
  }

  cambios(){
    this.formPre.valueChanges
          .subscribe(valor=>{
            var suma = 0;
            var importe = 0;
            var i;
            for(i=0;i<valor.items.length;i++){
              var cantidad = valor.items[i].cantidad;
              var precio = valor.items[i].precio;
              this.formPre.value.items[i].importe = this.redondear(precio * cantidad);
              suma = suma + valor.items[i].importe;
            }
            this.formPre.value.suma = this.redondear(suma);
            var tipo = valor.tipo;
            this.formPre.value.importeIVA = this.redondear( this.formPre.value.suma * tipo );
            this.formPre.value.total = this.redondear(this.formPre.value.importeIVA + this.formPre.value.suma);
          })
  }

}

