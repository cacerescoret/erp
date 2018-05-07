import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticulosService } from '../../servicios/articulos.service';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  formArticulo: FormGroup;
  articulo:any;

  constructor(private af: FormBuilder,
              private articulosService: ArticulosService,
              private router: Router) { }

  ngOnInit() {
    this.formArticulo = this.af.group({
      referencia: null,
      precio: null
    })
  }

  crearArticulo(){
    this.articulo = this.guardarArticulo();
    this.articulosService.postArticulo(this.articulo)
                              .subscribe((res:any)=>{
                                this.router.navigate(['/listado-articulos']);
                              },(error)=>{
                                console.log(error)
                              });
  }

  guardarArticulo(){
    const guardarArticulo = {
      referencia: this.formArticulo.get("referencia").value,
      precio: this.formArticulo.get("precio").value     
    }
    return guardarArticulo;
  }
}
