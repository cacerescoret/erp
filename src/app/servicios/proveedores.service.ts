import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class ProveedoresService {

  token:string;

  constructor(private http: HttpClient,
              private usuariosService: UsuariosService) { }

  getProveedores(){
    let url = 'http://localhost:3000/proveedor';
    return this.http.get(url)
                  .map((res:any)=>{
                    return res;
                  });
  }

  getProveedor(id){
    let url = "http://localhost:3000/proveedor/";
    return this.http.get(url+id)
                      .map((res:any)=>{
                        return res;
                      });
  }

  postProveedor(proveedor){
    let url = 'http://localhost:3000/proveedor';
    return this.http.post(url, proveedor)
                  .map((res:any)=>{
                    return res;
                  });
  }

  putProveedor(id, proveedor){
    let url = "http://localhost:3000/proveedor/";
    return this.http.put(url+id,proveedor)
                  .map((res:any)=>{
                    return res;
                  });
  }

  deleteProveedor(id){
    this.token = this.usuariosService.token;
    let url = "http://localhost:3000/proveedor/" + id + '?token=' + this.token;
    return this.http.delete(url)
                    .map((res:any)=>{
                      return res;
                    });
  }

}
