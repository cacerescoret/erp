import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(){
    let url = 'http://localhost:3000/cliente';
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
