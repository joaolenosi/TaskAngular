using System.Collections.Generic;
using System.Threading.Tasks;
using TASKAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TASKAPI.Controllers
{
     //Para sinalizar que é uma API
    [ApiController]
    [Route("/api/[controller]")]
    public class TarefasController : ControllerBase
    {
         private readonly Contexto _contexto;
          //Constructor
        public TarefasController(Contexto contexto){
            _contexto = contexto;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetAllAsync(){
            return await _contexto.Tarefas.ToListAsync();
        }

        [HttpGet ("{tarefaId}")]
        public async Task<ActionResult<Tarefa>> GetTarefaIdAsync(int tarefaId) {
            Tarefa tarefa = await _contexto.Tarefas.FindAsync(tarefaId);
            if (tarefa == null)
                return NotFound();

            return tarefa;
        }

        [HttpPost]
        public async Task<ActionResult<Tarefa>> SetTarefaAsync (Tarefa tarefa) {
            await _contexto.Tarefas.AddAsync(tarefa);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTarefaAsync (Tarefa tarefa) {
            _contexto.Tarefas.Update (tarefa);

            //Persiste a transação no banco de dados.
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete ("{tarefaId}")]
        public async Task<ActionResult> DeleteTarefaAsync (int tarefaId) {
            Tarefa tarefa = await _contexto.Tarefas.FindAsync (tarefaId);
            if (tarefa == null)
                return NotFound();

            _contexto.Remove (tarefa);
            await _contexto.SaveChangesAsync();
            return Ok ();
        }
        
    }
}