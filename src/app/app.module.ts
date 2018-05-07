import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { HttpClientModule } from '@angular/common/http';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { FacturasService } from './servicios/facturas.service';
import { ListadoFraComponent } from './facturas/listado-fra/listado-fra.component';
import { CrearFraComponent } from './facturas/crear-fra/crear-fra.component';
import { EditarFraComponent } from './facturas/editar-fra/editar-fra.component';
import { UsuariosService } from './servicios/usuarios.service';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RutasGuard } from './rutas.guard';
import { VentasComponent } from './ventas/ventas.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { EditarPresupuestoComponent } from './presupuestos/editar-presupuesto/editar-presupuesto.component';
import { CrearPresupuestoComponent } from './presupuestos/crear-presupuesto/crear-presupuesto.component';
import { ListadoPresupuestosComponent } from './presupuestos/listado-presupuestos/listado-presupuestos.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { ClientesService } from './servicios/clientes.service';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { ListadoSesionesComponent } from './autenticacion/listado-sesiones/listado-sesiones.component';
import { CrearArticuloComponent } from './articulos/crear-articulo/crear-articulo.component';
import { EditarArticuloComponent } from './articulos/editar-articulo/editar-articulo.component';
import { ListadoArticulosComponent } from './articulos/listado-articulos/listado-articulos.component';
import { ArticulosService } from './servicios/articulos.service';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'registro', component: RegistroComponent},
  { path: 'inicio-sesion', component: LoginComponent},
  { path: 'listado-usuarios', component: ListadoUsuariosComponent, canActivate: [RutasGuard] },  
  { path: 'listado-sesiones/:nombre', component: ListadoSesionesComponent, canActivate: [RutasGuard] },  
  { path: 'compras', component: ComprasComponent, canActivate: [RutasGuard] },
  { path: 'listado-proveedores', component: ListadoProvComponent, canActivate: [RutasGuard]},
  { path: 'crear-proveedor', component: CrearProvComponent, canActivate: [RutasGuard] },
  { path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [RutasGuard] },
  { path: 'listado-facturas', component: ListadoFraComponent, canActivate: [RutasGuard]},
  { path: 'crear-factura', component: CrearFraComponent, canActivate: [RutasGuard] },
  { path: 'editar-factura/:id', component: EditarFraComponent, canActivate: [RutasGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [RutasGuard] },
  { path: 'listado-clientes', component: ListadoClientesComponent, canActivate: [RutasGuard]},
  { path: 'crear-cliente', component: CrearClienteComponent, canActivate: [RutasGuard] },
  { path: 'editar-cliente/:id', component: EditarClienteComponent, canActivate: [RutasGuard] },
  { path: 'listado-presupuestos', component: ListadoPresupuestosComponent, canActivate: [RutasGuard]},
  { path: 'crear-presupuesto', component: CrearPresupuestoComponent, canActivate: [RutasGuard] },
  { path: 'editar-presupuesto/:id', component: EditarPresupuestoComponent, canActivate: [RutasGuard] },
  { path: 'listado-articulos', component: ListadoArticulosComponent, canActivate: [RutasGuard]},
  { path: 'crear-articulo', component: CrearArticuloComponent, canActivate: [RutasGuard] },
  { path: 'editar-articulo/:id', component: EditarArticuloComponent, canActivate: [RutasGuard] },
  { path: '**', component: InicioComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    ComprasComponent,
    ListadoProvComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFraComponent,
    CrearFraComponent,
    EditarFraComponent,
    RegistroComponent,
    LoginComponent,
    VentasComponent,
    ListadoClientesComponent,
    CrearClienteComponent,
    EditarClienteComponent,
    EditarPresupuestoComponent,
    CrearPresupuestoComponent,
    ListadoPresupuestosComponent,
    ListadoUsuariosComponent,
    ListadoSesionesComponent,
    CrearArticuloComponent,
    EditarArticuloComponent,
    ListadoArticulosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, 
              FacturasService, 
              UsuariosService,
              RutasGuard,
              PresupuestosService,
              ClientesService,
              ArticulosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
