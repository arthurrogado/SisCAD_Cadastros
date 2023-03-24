import HttpClient from "../../classes/Model.js";

const listagemAlunos = new HttpClient('./listagem_alunos.php')
listagemAlunos.placeAll('./listagem_alunos.php')