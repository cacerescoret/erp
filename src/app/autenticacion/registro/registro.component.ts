import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})

export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  usuario:any;
  mostrarAlerta:boolean = false;
  mensaje:string = "Error de conexión, inténtelo de nuevo más tarde";
  enviando:boolean = false;

  constructor(private fr: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.registroForm = this.fr.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required,
                   //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')] ],
                   Validators.email ]],
      password: ['',[Validators.required,
                     Validators.minLength(8),
                     Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      repassword: null
    })
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  crearUsuario(){
    this.enviando = true;
    this.mostrarAlerta = false;
    this.usuario = this.guardarUsuario();
    this.usuariosService.postUsuario(this.usuario)
                          .subscribe((res:any)=>{
                            this.enviando = false;
                            this.router.navigate(['/']);
                          },(error:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            if(error.error.errores.errors.email.message){
                                this.mensaje = error.error.errores.errors.email.message;
                            } 
                          })
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value.toLowerCase(),
      password: this.registroForm.get('password').value,
    }

    return guardarUsuario;
  }

}
