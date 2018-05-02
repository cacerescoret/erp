import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-sesiones',
  templateUrl: './listado-sesiones.component.html',
  styleUrls: ['./listado-sesiones.component.css']
})
export class ListadoSesionesComponent implements OnInit {

  sesiones:any[] = [];
  nombre:string;

  constructor(private usuariosService: UsuariosService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.nombre = this.route.snapshot.params['nombre'];
    this.cargarSesiones();
  }

  cargarSesiones(){
    this.usuariosService.getSesiones(this.nombre)
                    .subscribe((resp:any)=>{
                      this.sesiones = resp.sesiones;
                    },(error)=>{
                      console.log(error);
                    })
  }

}
