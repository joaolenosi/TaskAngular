import { TarefasService } from './tarefas.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Funções do angular
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';

@NgModule({
  declarations: [
    AppComponent,
    TarefasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
   //Serviços que iram ser inicializados via injeção de dependência
  providers: [HttpClientModule, TarefasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
