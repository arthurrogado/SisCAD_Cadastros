import HttpClient from "../../classes/Model.js";

const listagemDisciplinas = new HttpClient('./listagem_disciplinas.php')
listagemDisciplinas.placeAll('./listagem_disciplinas.php')

listagemDisciplinas.getAll()
.then(disciplinas => {
    console.log('disciplinas: ', disciplinas)
    listagemDisciplinas.createAndFillTable(disciplinas, ['#', 'Nome', 'Carga Horária', 'Ementa', 'Bibliografia', 'Pré requisitos'], 'disciplinas', 'dataTable', ['id', 'nome', 'carga_horaria', 'ementa', 'bibliografia', 'pre_requisito'], null, 'body', true)
} )