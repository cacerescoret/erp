import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuariosService } from './servicios/usuarios.service'

@Injectable()
export class RutasGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService){}
  
  canActivate(){
    if(this.usuariosService.logueado()){
      return true;
    } else {
      return false;
    }
  }
}
