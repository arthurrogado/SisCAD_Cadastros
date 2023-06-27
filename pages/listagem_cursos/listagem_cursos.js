import HttpClient from "../../classes/Model.js";

const listagemCursos = new HttpClient('./listagem_cursos.php')

listagemCursos.getAll()
.then(cursos => {
    listagemCursos.createAndFillTable(cursos, ['#', 'Nome', 'Descrição', 'Coordenador'], 'cursos', 'dataTable', ['id', 'nome', 'descricao', 'coordenador'], null, 'body', true)
})