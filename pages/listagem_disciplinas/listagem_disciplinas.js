import HttpClient from "../../classes/Model.js";

const listagemDisciplinas = new HttpClient('./listagem_disciplinas.php')
listagemDisciplinas.getAll('./listagem_disciplinas.php')