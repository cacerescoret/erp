import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})

export class ListadoProvComponent implements OnInit {

  proveedores:any;
  id:string;
  mostrarAlerta:boolean = false;
  mensaje:string;
  tramo:number = 0;
  totales:number;
  botones:any[] = [1,2,3,4,5];
  tramoBotones:number = 0;

  constructor(private proveedoresService: ProveedoresService,
              private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores(this.tramo)
                  .subscribe((res:any)=>{
                    this.proveedores = res.proveedores;
                    this.totales = res.totales;
                  });
  }

  avanzarTramo(valor){

      this.tramo += valor;
      if(this.tramo === (this.tramoBotones+5)*5){
        this.tramoBotones += 5;
        this.avanzarBotones();
      } 
      this.cargarProveedores();

  }

  retrocederTramo(valor){
    this.tramo += valor;
    if(this.tramo === this.tramoBotones * 5 - 5 ){
      this.tramoBotones -= 5;
      this.avanzarBotones();
    }
    this.cargarProveedores();
  }

  setPagina(valor){
    this.tramo = valor;
    this.cargarProveedores();
  }

  avanzarBotones(){
    this.botones = [];
    var numeroBotones = Math.ceil(this.totales / 5);
    var i;
    for(i=this.tramoBotones; i < this.tramoBotones + 5; i++){
      this.botones.push(i+1);
    }
  }

  avanzarTramoBotones(valor){
    this.tramoBotones += valor;
    this.botones = [];
    var i;
    for(i=this.tramoBotones; i < this.tramoBotones + 5; i++){
      this.botones.push(i+1);
    }
    this.tramo = this.tramoBotones * 5;
    this.cargarProveedores();
  }

  retrocederTramoBotones(valor){
    this.tramoBotones += valor;
    this.botones = [];
    var i;
    for(i=this.tramoBotones; i < this.tramoBotones + 5; i++){
      this.botones.push(i+1);
    }
    this.tramo = this.tramoBotones * 5;
    this.cargarProveedores();
  }



  obtenerId(id){
    this.id = id;
  }

  borrarProveedor(){
    this.proveedoresService.deleteProveedor(this.id)
                  .subscribe((res:any)=>{
                    this.cargarProveedores();
                    this.mensaje = "El proveedor fue eliminado";
                    this.mostrarAlerta = true;
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2000);
                  }, (error:any)=>{
                    if (error.error.mensaje === 'token incorrecto'){
                      this.mensaje = 'Sesión caducada, reinicie sesión'
                    } else {
                      this.mensaje = "Error de conexión";
                    }
                    this.mostrarAlerta = true;
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2000);
                    setTimeout(()=>{
                      this.mensaje = "Error de conexión";
                    }, 3000);
                  })
  }
}
