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

}
