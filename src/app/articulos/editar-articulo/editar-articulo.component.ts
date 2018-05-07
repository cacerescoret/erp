import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.css']
})
export class EditarArticuloComponent implements OnInit {

  formArticulo: FormGroup;
  articulo:any;
  id:string;

  constructor(private pf: FormBuilder,
              private articulosService: ArticulosService,
              private router: Router,
              private route: ActivatedRoute) { 
                if(!this.articulo){
                  this.articulo = {};
                }
              }

    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.getArticuloId(this.id);
      this.formArticulo = this.pf.group({
        referencia: null,
        precio: null
      })
    }

    getArticuloId(id){
      this.articulosService.getArticulo(id)
                    .subscribe((res:any)=>{
                      this.articulo = res.articulo;
                    })
    }

    editarArticulo(){
      this.articulo = this.guardarArticulo();
      this.articulosService.putArticulo(this.id, this.articulo )
                                .subscribe((res:any)=>{
                                    this.router.navigate(['/listado-articulos']);
                                })
    }
    guardarArticulo(){
      const guardarArticulo = {
        referencia: this.formArticulo.get("referencia").value,
        precio: this.formArticulo.get("precio").value,  
      }
      return guardarArticulo;
    }

}
