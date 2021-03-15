import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tarefa } from 'src/app/Tarefa';
import { TarefasService } from 'src/app/tarefas.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  tarefas: Tarefa[];
  
  titulo:string;
  tarefaId:number;
  
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef;
  //TarefasService: any;
  
  constructor(private tarefasService: TarefasService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.tarefasService.GetAll().subscribe(resultado =>{
      this.tarefas = resultado;
    });

  }


  exibirFormularioCadastro(): void {
    this.tituloFormulario = 'Nova Tarefa';
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.formulario = new FormGroup({
      titulo    : new FormControl(null),
      descricao : new FormControl(null),
      situacao  : new FormControl(null),
      grupo     : new FormControl(null),
      dataTarefa: new FormControl(null),

    })
  }

  
  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }


  exibirFormularioAtualizacao(tarefaId):void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tarefasService.GetById(tarefaId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.titulo} ${resultado.grupo}`;

      this.formulario = new FormGroup({
        tarefaId  : new FormControl(resultado.tarefaId),
        titulo    : new FormControl(resultado.titulo),
        descricao : new FormControl(resultado.descricao),
        situacao  : new FormControl(resultado.situacao),
        grupo     : new FormControl(resultado.grupo),
        dataTarefa: new FormControl(resultado.dataTarefa),
      });
    })
  }
  //Lembrar de tipar os metódos e variaveis.
  //Como a função nao retorna nada é um void.
  EnviarFormulario(): void{
    const tarefa : Tarefa = this.formulario.value;
    if (tarefa.tarefaId > 0) {
		this.tarefasService.UpdateTarefa(tarefa).subscribe((resultado) => {
			this.visibilidadeFormulario = false;
			this.visibilidadeTabela = true;
			alert('tarefa atualizada com sucesso');
			
			this.tarefasService.GetAll().subscribe((registros) => {
				this.tarefas = registros;
			});
		});
    } else{
		//Chama o metodo salvarPEssoa e executa com um subscribe
		this.tarefasService.SetTarefa(tarefa).subscribe(resultado =>{
			this.visibilidadeFormulario = false;
			this.visibilidadeTabela = true;
			alert('Tarefa inserida com sucesso!');

			this.tarefasService.GetAll().subscribe(registros =>{
				this.tarefas = registros;
			});
		});
	}

  }

  ExibirConfirmacaoExclusao(tarefaId, titulo, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.tarefaId = tarefaId;
    this.titulo = titulo;
  }

  ExcluirTarefa(tarefaId){
    this.tarefasService.DeleteTarefa(tarefaId).subscribe(resultado => {
      this.modalRef.hide();
      alert('Tarefa excluída com sucesso');
      this.tarefasService.GetAll().subscribe(registros => {
        this.tarefas = registros;
      });
    });
  }

}
