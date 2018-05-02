import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  animations: [
    trigger('formulario',[
      state('show', style({
        opacity: 1,
        height: 50
      })),
      state('hide', style({
        opacity: 0,
        height: 0
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ]),
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios:any;
  usuario:any;
  formUsuario: FormGroup;
  formEditarUsuario: FormGroup;
  usuarioNuevo:any;
  mostrarFormulario:boolean = false;
  mostrarAlerta:boolean = false;
  mensaje:string = 'Error de conexión con la base de datos';
  enviando:boolean = false;
  filaEditada:string;

  constructor(private usuariosService: UsuariosService,
              private fu: FormBuilder,
              private feu: FormBuilder) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.formUsuario = this.fu.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    })
    this.formEditarUsuario = this.feu.group({
      nombre: [null, Validators.required],
      email: [null, Validators.required],
      rol: [null, Validators.required]
    })
  }

  get MostrarFormulario(){
    return this.mostrarFormulario ? 'show' : 'hide';
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  verFormulario(){
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  cargarUsuarios(){
    this.usuariosService.getUsuarios()
            .subscribe((res:any)=>{
              this.usuarios = res.usuarios;
            }, (error)=>{
              console.log(error);
            })
  }

  crearUsuario(){
    this.enviando = true;
    this.usuarioNuevo = this.guardarUsuario();
    this.usuariosService.postUsuario(this.usuarioNuevo)
                          .subscribe((res:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            this.mensaje = 'Usuario creado correctamente';
                            this.cargarUsuarios();
                            this.formUsuario.reset();
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          },(error:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            if (error.error.mensaje === 'token incorrecto'){
                              this.mensaje = 'Sesión caducada, reinicie sesión';
                            } else if(error.error.errores.errors.email.message){
                                this.mensaje = error.error.errores.errors.email.message;
                            }
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          })
    setTimeout(()=>{
      this.mensaje = 'Error de conexión con la base de datos';
    },4000)
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.formUsuario.get('nombre').value,
      email: this.formUsuario.get('email').value.toLowerCase(),
      password: this.formUsuario.get('password').value,
      rol: this.formUsuario.get('rol').value,
    }

    return guardarUsuario;
  }


  editarFila(id){
    this.filaEditada = id;
  }

  editarUsuario(id){
    this.enviando = true;
    this.usuario = this.guardarUsuarioEditado();
    this.usuariosService.putUsuario(id, this.usuario )
                          .subscribe((res:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            this.mensaje = 'Usuario actualizado correctamente';
                            this.cargarUsuarios();
                            this.filaEditada = '';
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          },(error:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            if(error.error.errores.errors.email.message){
                                this.mensaje = error.error.errores.errors.email.message;
                            }
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          })
    setTimeout(()=>{
    this.mensaje = 'Error de conexión con la base de datos';
    },4000)
  }

  guardarUsuarioEditado(){
    const guardarUsuarioEditado = {
      nombre: this.formEditarUsuario.get('nombre').value,
      email: this.formEditarUsuario.get('email').value.toLowerCase(),
      rol: this.formEditarUsuario.get('rol').value
    }
    return guardarUsuarioEditado;
  }

  cancelarEdicion(){
    this.filaEditada = '';
    this.cargarUsuarios();
  }

  eliminarUsuario(id){
    this.enviando = true;
    this.mensaje = 'Error de conexión con la base de datos';
    this.usuariosService.deleteUsuario(id)
                          .subscribe((res:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            this.mensaje = 'Usuario eliminado correctamente';
                            this.cargarUsuarios();
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          },(error:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            setTimeout(()=>{
                              this.mostrarAlerta = false;
                            },2000)
                          })
  }

}
