import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuariosService {

  token:string;
  nombre:string;
  rol:string;
  id:string;
  ultimoLogin:any;

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
    //Las consultas en las url se construyen con ?nombreconsulta=
    let url = 'http://localhost:3000/usuario?token=' + this.token;
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
                    this.guardarCredenciales(res.token, res.nombre, res.rol, res._id);
                    return res;
                  });
  }

  guardarCredenciales(token, nombre, rol, id){
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('rol', rol);
    localStorage.setItem('id', id);
    this.token = token;
    this.nombre = nombre;
    this.rol = rol;
    this.id = id; 
    this.ultimoLogin = new Date().valueOf();
    localStorage.setItem('ultimoLogin', this.ultimoLogin);
  }

  cargarCredenciales(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
      this.id = localStorage.getItem('id');
      this.ultimoLogin = localStorage.getItem('ultimoLogin');
    }else{
      this.token = '';
      this.nombre = '';
      this.rol = '';
      this.id = '';
      this.ultimoLogin = '';
    }
  }

  logueado(){
    return (this.token.length > 0) ? true : false;
  }
  
  logout(){
    this.token = '';
    this.nombre = '';
    this.rol = '';
    this.id = '';
    this.ultimoLogin = '';
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');
    localStorage.removeItem('ultimoLogin');
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

  postSesion(sesion){
    let url = 'http://localhost:3000/usuario/sesion/'+ this.id;
    return this.http.put(url, sesion)
                  .map((res:any)=>{
                    return res;
                  });
  }

  getSesiones(nombre){
    let url = 'http://localhost:3000/usuario/sesion?nombre=' + nombre;
    return this.http.get(url)
                  .map((res:any)=>{
                    return res;
                  })
  }

}
