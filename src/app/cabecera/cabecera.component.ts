import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
  }

  getLogueado(){
    return this.usuariosService.logueado();
  }

  crearSesion(){
    var ultimoLogin = Number(localStorage.getItem('ultimoLogin'));
    var duracion = new Date().valueOf() - ultimoLogin;
    var duracionS = duracion / 1000;
   
    var h = Math.floor( duracionS / 3600);
    var hh = ("0" + h).slice(-2);
    var m = Math.floor( (duracionS % 3600) / 60);
    var mm = ("0" + m).slice(-2);
    var s = Math.floor( duracionS % 60);
    var ss = ("0" + s).slice(-2);

    var sesion = {
      logout: new Date(),
      duracion: hh + " h " + mm + " min " + ss + " seg"
    }
    this.usuariosService.postSesion(sesion)
                        .subscribe((resp:any)=>{
                          
                        }, (error)=>{
                          console.log(error);
                        })
  }

}
