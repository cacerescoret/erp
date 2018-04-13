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

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'listado-proveedores', component: ListadoProvComponent},
  { path: 'crear-proveedor', component: CrearProvComponent },
  { path: 'editar-proveedor/:id', component: EditarProvComponent },
  { path: 'listado-facturas', component: ListadoFraComponent},
  { path: 'crear-factura', component: CrearFraComponent },
  { path: 'editar-factura/:id', component: EditarFraComponent },
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
    EditarFraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, FacturasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
