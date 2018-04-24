import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
  }

  getLogueado(){
    return this.usuariosService.logueado();
  }

}
