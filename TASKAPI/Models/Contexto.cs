using Microsoft.EntityFrameworkCore;

namespace TASKAPI.Models
{
    public class Contexto :DbContext
    {
        public DbSet<Tarefa> Tarefas { get; set; }

        //Constructor
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes){

        } 
        
    }
}