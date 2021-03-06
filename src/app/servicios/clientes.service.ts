import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientesService {

  constructor(private http: HttpClient) { }

  getTodosClientes(){
    let url = 'http://localhost:3000/cliente';
    return this.http.get(url)
                  .map((res:any)=>{
                    return res;
                  });
  }

  getClientes(nombre){
    let url = 'http://localhost:3000/cliente/nombre/';
    return this.http.get(url+nombre)
                  .map((res:any)=>{
                    return res;
                  });
  }

  getClientesLocalidad(localidad){
    let url = 'http://localhost:3000/cliente/localidad/';
    return this.http.get(url+localidad)
                  .map((res:any)=>{
                    return res;
                  });
  }

  getClientesNombreLocalidad(consulta){
    let url = 'http://localhost:3000/cliente/mixto/'+ consulta.nombre + '/' + consulta.localidad;
    return this.http.get(url)
                      .map((res:any)=>{
                        return res;
                      });
  }

  getCliente(id){
    let url = "http://localhost:3000/cliente/";
    return this.http.get(url+id)
                      .map((res:any)=>{
                        return res;
                      });
  }

  postCliente(cliente){
    let url = 'http://localhost:3000/cliente';
    return this.http.post(url, cliente)
                  .map((res:any)=>{
                    return res;
                  });
  }

  putCliente(id, cliente){
    let url = "http://localhost:3000/cliente/";
    return this.http.put(url+id,cliente)
                  .map((res:any)=>{
                    return res;
                  });
  }

  deleteCliente(id){
    let url = "http://localhost:3000/cliente/";
    return this.http.delete(url+id)
                    .map((res:any)=>{
                      return res;
                    });
  }

}
