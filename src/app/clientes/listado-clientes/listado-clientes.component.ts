import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})

export class ListadoClientesComponent implements OnInit {

  buscador: FormControl;
  buscadorLocalidad: FormControl;
  buscNombreLocalidad: FormGroup;
  clientes:any;
  id:string;
  mensaje:boolean = false;
  verBuscadorNombre:boolean = true;
  verBuscadorLocalidad:boolean = false;
  verBuscadorNombreLocalidad:boolean = false;
  consulta:any;
  buscando:boolean = false;

  constructor(private clientesService: ClientesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges
              .subscribe(nombre =>{
                this.buscando = true;
                if(nombre.length !== 0){
                  this.clientesService.getClientes(nombre)
                  .subscribe((resp:any)=>{
                    this.buscando = false;
                    this.clientes = resp.clientes;
                    if(this.clientes.length === 0){
                      this.mensaje = true;
                    } else {
                      this.mensaje = false;
                    }
                  },(error)=>{
                    this.buscando = false;
                    console.log(error);
                  })
                } else {
                  this.buscando = false;
                  this.clientes = [];
                  this.mensaje = false;
                }
              })
    this.buscadorLocalidad = new FormControl();
    this.buscadorLocalidad.valueChanges
              .subscribe(localidad =>{
                this.buscando = true;
                if(localidad.length !== 0){
                  this.clientesService.getClientesLocalidad(localidad)
                  .subscribe((resp:any)=>{
                    this.buscando = false;
                    this.clientes = resp.clientes;
                    if(this.clientes.length === 0){
                      this.mensaje = true;
                    } else {
                      this.mensaje = false;
                    }
                  },(error)=>{
                    this.buscando = false;
                    console.log(error);
                  })
                } else {
                  this.buscando = false;
                  this.clientes = [];
                  this.mensaje = false;
                }
              })
    this.buscNombreLocalidad = this.fb.group({
      nombre: null,
      localidad: null
    })
  }

  crearConsulta(){
    this.buscando = true;
    this.clientes = [];
    this.consulta = this.guardarConsulta();
    this.clientesService.getClientesNombreLocalidad(this.consulta)
                            .subscribe((resp:any)=>{
                              this.buscando = false;
                              this.clientes = resp.clientes;
                              if(this.clientes.length === 0){
                                this.mensaje = true;
                              } else {
                                this.mensaje = false;
                              }
                              this.buscNombreLocalidad.reset();
                            },(error)=>{
                              this.buscando = false;
                              console.log(error);
                            })
  }

  guardarConsulta(){
    const guardarConsulta = {
      nombre: this.buscNombreLocalidad.get('nombre').value,
      localidad: this.buscNombreLocalidad.get('localidad').value
    }
    return guardarConsulta;
  }

  mostrarBuscadorNombre(){
    this.verBuscadorNombre = true;
    this.verBuscadorLocalidad = false;
    this.verBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscador.setValue('');
  }

  mostrarBuscadorLocalidad(){
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = true;
    this.verBuscadorNombreLocalidad = false;
    this.clientes = [];
    this.buscadorLocalidad.setValue('');
  }

  mostrarBuscadorNombreLocalidad(){
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = false;
    this.verBuscadorNombreLocalidad = true;
    this.clientes = [];
  }

}
