import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-presupuesto',
  templateUrl: './editar-presupuesto.component.html',
  styleUrls: ['./editar-presupuesto.component.css']
})
export class EditarPresupuestoComponent implements OnInit {

  formPre: FormGroup;
  presupuesto:any;
  articulos:any;
  id:string;

  constructor(private presupuestosService: PresupuestosService,
              private articulosService: ArticulosService,
              private fp: FormBuilder,
              private router: Router,
              private route: ActivatedRoute){
                setTimeout(()=>{
                  this.cambios();
                },1000)
              }
              

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
    this.cargarDatos();
    this.formPre = this.fp.group({
      cliente: null,
      cif: null,
      fecha: null,
      items: this.fp.array([
        this.initItem()
      ]),
      suma: 0,
      tipo: 0.21,
      importeIVA: 0,
      total: 0,
      num: null
    })
  }

  cargarDatos(){
    this.articulosService.getArticulos()
                      .subscribe((resp:any)=>{
                        this.articulos = resp.articulos;
                      },(error)=>{
                        console.log(error)
                      })
  }

  getId(id){
    this.presupuestosService.getPresupuestoId(id)
              .subscribe((resp:any)=>{
                this.presupuesto = resp.presupuesto;
                this.patchForm();
              },(error)=>{
                console.log(error);
              })
    this.id = id;
  }

  patchForm(){
    var nro = '000' + this.presupuesto.numero + '/18';
    this.formPre.patchValue({
      cliente: this.presupuesto.cliente,
      cif: this.presupuesto.cif,
      fecha: this.presupuesto.fecha,
      suma: this.presupuesto.suma,
      tipo: this.presupuesto.tipo,
      importeIVA: this.presupuesto.importeIVA,
      total: this.presupuesto.total,
      num: nro.slice(-6)
    })
    this.setFormPreItems();
  }

  setFormPreItems(){
    const control = <FormArray>this.formPre.controls.items;
    this.presupuesto.items.forEach(element=>{
      control.push(this.fp.group({
        articulo: element.articulo,
        cantidad: element.cantidad,
        precio: element.precio,
        importe: element.importe
      }))
    })
    this.removeItem(0);
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
              if(articuloSel && this.formPre.value.items[i].importe){
                this.formPre.value.items[i].cantidad = valor.items[i].cantidad;
                this.formPre.value.items[i].precio = articuloSel.precio;
                this.formPre.value.items[i].importe = valor.items[i].cantidad * this.formPre.value.items[i].precio;
              } else if(articuloSel){
                this.formPre.value.items[i].cantidad = 1
                this.formPre.value.items[i].precio = articuloSel.precio;
                this.formPre.value.items[i].importe = valor.items[i].cantidad * this.formPre.value.items[i].precio;
              } else {
                this.formPre.value.items[i].precio = 0;
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

  editarPresupuesto(){
    this.presupuesto = this.guardarPresupuesto();
    this.presupuestosService.putPresupuesto(this.id, this.presupuesto)
                          .subscribe((resp:any)=>{
                            this.router.navigate(['/listado-presupuestos']); 
                          },(error)=>{
                            console.log(error);
                          })
  }

  guardarPresupuesto(){
    const guardarPresupuesto = {
      cliente: this.formPre.get('cliente').value,
      cif: this.formPre.get('cif').value,
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
