import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarefasComponent } from './components/tarefas/tarefas.component';

//Cria uma rota para o componente pessoas
const routes: Routes = [{
  path:'tarefas', component: TarefasComponent
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
