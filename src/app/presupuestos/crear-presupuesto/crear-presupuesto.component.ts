import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent implements OnInit {

  formPre: FormGroup;
  presupuesto:any;
  clientes:any;
  articulos:any;

  constructor(private presupuestosService: PresupuestosService,
              private clientesService: ClientesService,
              private articulosService: ArticulosService,
              private fp: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.cargarDatos();
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
    
  }

  ngAfterViewChecked(){
    this.cambios();
  }

  cargarDatos(){
    this.clientesService.getTodosClientes()
                      .subscribe((res:any)=>{
                        this.clientes = res.clientes;
                      },(error)=>{
                        console.log(error)
                      })
    this.articulosService.getArticulos()
                      .subscribe((resp:any)=>{
                        this.articulos = resp.articulos;
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
              var referencia = valor.items[i].articulo;
              var articuloSel = this.articulos.find(function(articulo){
                return articulo.referencia === referencia;
              });
              if(articuloSel){
                this.formPre.value.items[i].precio = articuloSel.precio;
                this.formPre.value.items[i].importe = valor.items[i].cantidad * this.formPre.value.items[i].precio;
              }
              suma = suma + valor.items[i].importe;
            }
            this.formPre.value.suma = this.redondear(suma);
            var tipo = valor.tipo;
            this.formPre.value.importeIVA = this.redondear( this.formPre.value.suma * tipo );
            this.formPre.value.total = this.redondear(this.formPre.value.importeIVA + this.formPre.value.suma);
          })
  }

  crearPresupuesto(){
    this.presupuesto = this.guardarPresupuesto();
    this.presupuestosService.postPresupuesto(this.presupuesto)
                          .subscribe((resp:any)=>{
                            this.router.navigate(['/listado-presupuestos']); 
                          },(error)=>{
                            console.log(error);
                          })
  }

  guardarPresupuesto(){
    const guardarPresupuesto = {
      cliente: this.formPre.get('cliente').value,
      fecha: this.formPre.get('fecha').value,
      items: this.formPre.get('items').value,
      suma: this.formPre.get('suma').value,
      tipo: this.formPre.get('tipo').value,
      importeIVA: this.formPre.get('importeIVA').value,
      total: this.formPre.get('total').value
    }
    return guardarPresupuesto;
  }

}

