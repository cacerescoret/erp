import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent implements OnInit {

  @ViewChild('cliente') clienteRef: ElementRef;

  formPre: FormGroup;
  presupuesto:any;
  base:number;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean = false;

  constructor(private fp: FormBuilder,
              private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.formPre = this.fp.group({
      cliente: [ null , Validators.required ],
      cif: ['' , [Validators.required, Validators.minLength(9)]],
      fecha: null,
      concepto: null,
      base: [null, Validators.required],
      retencion: false,
      tipo: 0.21,
      irpf: this.formatearMoneda(0),
      importe: this.formatearMoneda(0),
      total: this.formatearMoneda(0)
    });
    this.cambios();
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

  formatearMoneda(valor){
    var resultado = new Intl.NumberFormat("es-ES",{style: "currency", currency: "EUR"})
                      .format(valor);
    return resultado;
  }

  cambios(){
    this.formPre.valueChanges.subscribe(valorForm =>{
      this.base = this.redondear(valorForm.base);
      this.retencion = valorForm.retencion;
      this.tipo = valorForm.tipo;
      if(this.retencion){
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      this.importe = this.redondear(this.base * this.tipo);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.formPre.value.irpf = this.formatearMoneda(this.irpf);
      this.formPre.value.importe = this.formatearMoneda(this.importe);
      this.formPre.value.total = this.formatearMoneda(this.total);
    })
 
  }

  
  registrarPre(){
    this.presupuesto = this.guardarPre();
    this.presupuestosService.postPresupuesto(this.presupuesto)
            .subscribe((res:any)=>{
              console.log(res);
            })
    this.formPre = this.fp.group({
      cliente: [ null , Validators.required ],
      cif: ['' , [Validators.required, Validators.minLength(9)]],
      fecha: null,
      concepto: null,
      base: [null, Validators.required],
      retencion: false,
      tipo: 0.21,
      irpf: this.formatearMoneda(0),
      importe: this.formatearMoneda(0),
      total: this.formatearMoneda(0)
    });
    this.cambios();
    this.clienteRef.nativeElement.focus();
  }

  guardarPre(){
    const guardarPre = {
      cliente: this.formPre.get('cliente').value,
      cif: this.formPre.get('cif').value,
      fecha: this.formPre.get('fecha').value,
      concepto: this.formPre.get('concepto').value,
      base: this.formPre.get('base').value,
      retencion: this.formPre.get('retencion').value,
      tipo: this.formPre.get('tipo').value,
      irpf: this.formPre.get('irpf').value,
      importe: this.formPre.get('importe').value,
      total: this.formPre.get('total').value,
      fechaRegistro: new Date()
    }
    return guardarPre;
  }

}

