import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuariosService {

  token:string;
  nombre:string;
  rol:string;

  constructor(private http: HttpClient,
              private router: Router) { 
    this.cargarCredenciales();
   }

   getUsuarios(){
    let url = 'http://localhost:3000/usuario';
    return this.http.get(url)
                  .map((res:any)=>{
                    return res;
                  });
  }

  postUsuario(usuario){
    let url = 'http://localhost:3000/usuario';
    return this.http.post(url, usuario)
                  .map((res:any)=>{
                    return res;
                  });
  }

  putUsuario(id, usuario){
    let url = "http://localhost:3000/usuario/";
    return this.http.put(url+id, usuario)
                  .map((res:any)=>{
                    return res;
                  });
  }

  deleteUsuario(id){
    let url = "http://localhost:3000/usuario/";
    return this.http.delete(url+id)
                    .map((res:any)=>{
                      return res;
                    });
  }

  login(usuario){
    let url = 'http://localhost:3000/login';
    return this.http.post(url, usuario)
                  .map((res:any)=>{
                    this.guardarCredenciales(res.token, res.nombre, res.rol);
                    return res;
                  });
  }

  guardarCredenciales(token, nombre, rol){
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', rol);
    this.token = token;
    this.nombre = nombre;
    this.rol = rol;
  }

  cargarCredenciales(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
    }else{
      this.token = '';
      this.nombre = '';
      this.rol = '';
    }
  }

  logueado(){
    return (this.token.length > 0) ? true : false;
  }
  
  logout(){
    this.token = '';
    this.nombre = '';
    this.rol = '';
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  getPerAdmin(){
    if(this.rol === 'Administrador'){
      return true;
    } else {
      return false;
    }
  }

  getPerCompras(){
    if(this.rol === 'Administrador' ||
       this.rol === 'Director de Compras' ||
       this.rol === 'Empleado de Compras') {
         return true;
       } else {
         return false;
       }
  }

  getPerProveedores(){
      if(this.rol === 'Administrador' ||
      this.rol === 'Director de Compras') {
        return true;
      } else {
        return false;
      }
  }

}
