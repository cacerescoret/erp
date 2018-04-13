import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturasService } from '../../servicios/facturas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-fra',
  templateUrl: './editar-fra.component.html',
  styleUrls: ['./editar-fra.component.css']
})
export class EditarFraComponent implements OnInit {

  formFra: FormGroup;
  factura:any;
  base:number;
  tipo:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean = false;
  id:string;

  constructor(private ff: FormBuilder,
              private facturasService: FacturasService,
              private router: Router,
              private route: ActivatedRoute) { 
                if(!this.factura){
                  this.factura = {};
                }
              }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarFactura(this.id);
    this.iniciarFormulario();
  }

  cargarFactura(id){
    this.facturasService.getFacturaId(id)
                        .subscribe((res:any)=>{
                          this.factura = res.factura;
                          console.log(this.factura);
                        })
  }

  iniciarFormulario(){
    this.formFra = this.ff.group({
      proveedor: [ null , Validators.required ],
      cif: ['' , [Validators.required, Validators.minLength(9)]],
      fecha: null,
      concepto: null,
      base: [null, Validators.required],
      retencion: false,
      tipo: 0.21,
      irpf: null,
      importe: null,
      total: null,
    });
    this.detectarCambios();
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

  detectarCambios(){
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

  
  editarFra(){
    this.factura = this.guardarFra();
    this.facturasService.putFactura(this.id, this.factura)
    .subscribe((res:any)=>{
      this.router.navigate(['/listado-facturas']);
    })
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
      //fechaRegistro: new Date()
    }
    return guardarFra;
  }

}
