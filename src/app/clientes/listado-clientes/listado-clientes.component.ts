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
  clientes:any;
  id:string;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges
              .subscribe(nombre =>{
                this.clientesService.getClientes(nombre)
                        .subscribe((resp:any)=>{
                          this.clientes = resp.clientes;
                        },(error)=>{
                          console.log(error);
                        })
              })
  }

}
