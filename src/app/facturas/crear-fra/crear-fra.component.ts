import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';

@Component({
  selector: 'app-crear-fra',
  templateUrl: './crear-fra.component.html',
  styleUrls: ['./crear-fra.component.css']
})
export class CrearFraComponent implements OnInit {

  @ViewChild('proveedor') proveedorRef: ElementRef;

  formFra: FormGroup;
  factura:any;
  base:number;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean = false;

  constructor(private ff: FormBuilder,
              private facturasService: FacturasService) { }

  ngOnInit() {
    this.formFra = this.ff.group({
      proveedor: [ null , Validators.required ],
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
    this.formFra.valueChanges.subscribe(valorForm =>{
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
      this.formFra.value.irpf = this.formatearMoneda(this.irpf);
      this.formFra.value.importe = this.formatearMoneda(this.importe);
      this.formFra.value.total = this.formatearMoneda(this.total);
    })
 
  }

  
  registrarFra(){
    this.factura = this.guardarFra();
    this.facturasService.postFactura(this.factura)
            .subscribe((res:any)=>{
              console.log(res);
            })
    this.formFra = this.ff.group({
      proveedor: [ null , Validators.required ],
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
    this.proveedorRef.nativeElement.focus();
  }

  guardarFra(){
    const guardarFra = {
      proveedor: this.formFra.get('proveedor').value,
      cif: this.formFra.get('cif').value,
      fecha: this.formFra.get('fecha').value,
      concepto: this.formFra.get('concepto').value,
      base: this.formFra.get('base').value,
      retencion: this.formFra.get('retencion').value,
      tipo: this.formFra.get('tipo').value,
      irpf: this.formFra.get('irpf').value,
      importe: this.formFra.get('importe').value,
      total: this.formFra.get('total').value,
      fechaRegistro: new Date()
    }
    return guardarFra;
  }

}
