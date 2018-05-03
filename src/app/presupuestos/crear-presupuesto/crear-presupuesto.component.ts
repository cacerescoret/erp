import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      cliente: null
    })
  }

  cargarClientes(){
    this.clientesService.getTodosClientes()
                      .subscribe((res:any)=>{
                        this.clientes = res.clientes;
                      },(error)=>{
                        console.log(error)
                      })
  }

}

