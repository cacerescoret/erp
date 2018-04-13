import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores(){
    this.proveedoresService.getProveedores()
                  .subscribe((res:any)=>{
                    this.proveedores = res.proveedores;
                  });
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
                    this.mensaje = "Error de conexión";
                    this.mostrarAlerta = true;
                    setTimeout(()=>{
                      this.mostrarAlerta = false;
                    }, 2000);
                  })
  }
}
