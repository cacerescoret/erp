import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('alerta',[
      state('show', style({opacity: 1})),
      state('hide', style({opacity: 0})),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  usuario:any;
  mostrarAlerta:boolean = false;
  mensaje:string = "Error de conexión, inténtelo de nuevo más tarde";
  enviando:boolean = false;

  constructor(private fl: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fl.group({
      email: ['', [Validators.required,
                    Validators.email ]],
      password: ['',[Validators.required,
                      Validators.minLength(8)]]
    })
  }

  get estadoAlerta(){
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  inicioSesion(){
    this.enviando = true;
    this.mostrarAlerta = false;
    this.usuario = this.guardarUsuario();
    this.usuariosService.login(this.usuario)
                          .subscribe((res:any)=>{
                            this.enviando = false;
                            this.router.navigate(['/']);
                          },(error:any)=>{
                            this.enviando = false;
                            this.mostrarAlerta = true;
                            if(error.error.mensaje){
                              this.mensaje = error.error.mensaje;
                            } 
                          })
  }

  guardarUsuario(){
    const guardarUsuario = {
      email: this.loginForm.get('email').value.toLowerCase(),
      password: this.loginForm.get('password').value,
    }

    return guardarUsuario;
  }

}
