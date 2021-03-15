import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from './Tarefa';


const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  url = 'https://localhost:5001/api/tarefas';
  constructor(private http: HttpClient) { } 

  //Observable emite notificações sempre que há mudanças nos dados.
	GetAll(): Observable<Tarefa[]> {
		return this.http.get<Tarefa[]>(this.url);
	}

  GetById(tarefaId: number): Observable<Tarefa> {
		const apiUrl = `${this.url}/${tarefaId}`;
		return this.http.get<Tarefa>(apiUrl);
	}
	
	SetTarefa(tarefa: Tarefa): Observable<any> {
		return this.http.post<Tarefa>(this.url, tarefa, httpOptions);
	}
	
	//Passa o any por que não tem um tipo especifico.
	UpdateTarefa(tarefa: Tarefa): Observable<any> {
		return this.http.put<Tarefa>(this.url, tarefa, httpOptions);
	}
	

	DeleteTarefa(tarefaId: number): Observable<any> {
		const apiUrl = `${this.url}/${tarefaId}`;
		return this.http.delete<number>(apiUrl, httpOptions);
	}
	
}
