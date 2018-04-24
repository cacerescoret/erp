import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ClientesService } from '../../servicios/clientes.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class CrearClienteComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  formCliente: FormGroup;
  cliente:any;
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
              private clientesService: ClientesService,
              private router: Router) { }

  ngOnInit() {
    this.formCliente = this.pf.group({
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

  crearCliente(){
    this.enviando = true;
    this.mostrarAlerta = false;
    this.cliente = this.guardarCliente();
    this.clientesService.postCliente(this.cliente)
                              .subscribe((res:any)=>{
                                this.router.navigate(['/listado-clientes']);
                              },(error:any)=>{
                                this.enviando = false;
                                this.mostrarAlerta = true;
                                if(error.error.errores.errors.cif.message){
                                    this.cifRef.nativeElement.focus();
                                    this.mensaje = error.error.errores.errors.cif.message;
                                } 
                              });
  }
  guardarCliente(){
    const guardarCliente = {
      nombre: this.formCliente.get("nombre").value,
      cif: this.formCliente.get("cif").value,
      domicilio: this.formCliente.get("domicilio").value,
      cp: this.formCliente.get("cp").value,
      localidad: this.formCliente.get("localidad").value,
      provincia: this.formCliente.get("provincia").value,
      telefono: this.formCliente.get("telefono").value,
      email: this.formCliente.get("email").value,
      contacto: this.formCliente.get("contacto").value,
    }
    return guardarCliente;
  }

}
