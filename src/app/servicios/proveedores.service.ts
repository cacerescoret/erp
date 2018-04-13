import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProveedoresService {

  constructor(private http: HttpClient) { }

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
    let url = "http://localhost:3000/proveedor/";
    return this.http.delete(url+id)
                    .map((res:any)=>{
                      return res;
                    });
  }

}
