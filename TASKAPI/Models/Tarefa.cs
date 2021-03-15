using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TASKAPI.Models
{
    public class Tarefa
    {
        public int TarefaId { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Situacao { get; set; }
        public string Grupo { get; set; }
        public DateTime DataTarefa { get; set; }
    }

}
