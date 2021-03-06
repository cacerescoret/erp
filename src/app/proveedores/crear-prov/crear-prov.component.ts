import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class CrearProvComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  formProveedor: FormGroup;
  proveedor:any;
  provincias:string[] = [
    'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ];
  mostrarAlerta:boolean = false;
  mensaje:string = "Error de conexión, inténtelo de nuevo más tarde";
  enviando:boolean = false;

  constructor(private pf: FormBuilder,
              private proveedoresService: ProveedoresService,
              private router: Router) { }

  ngOnInit() {
    this.formProveedor = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null
    })
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  crearProveedor(){
    this.enviando = true;
    this.mostrarAlerta = false;
    this.proveedor = this.guardarProveedor();
    this.proveedoresService.postProveedor(this.proveedor)
                              .subscribe((res:any)=>{
                                this.router.navigate(['/listado-proveedores']);
                              },(error:any)=>{
                                this.enviando = false;
                                this.mostrarAlerta = true;
                                if(error.error.errores.errors.cif.message){
                                    this.cifRef.nativeElement.focus();
                                    this.mensaje = error.error.errores.errors.cif.message;
                                } 
                              });
  }
  guardarProveedor(){
    const guardarProveedor = {
      nombre: this.formProveedor.get("nombre").value,
      cif: this.formProveedor.get("cif").value,
      domicilio: this.formProveedor.get("domicilio").value,
      cp: this.formProveedor.get("cp").value,
      localidad: this.formProveedor.get("localidad").value,
      provincia: this.formProveedor.get("provincia").value,
      telefono: this.formProveedor.get("telefono").value,
      email: this.formProveedor.get("email").value,
      contacto: this.formProveedor.get("contacto").value,
    }
    return guardarProveedor;
  }

}
