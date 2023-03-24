import HttpClient from "../../classes/Model.js";

const cadastroDisciplina = new HttpClient('./cadastro_disciplina.php');
cadastroDisciplina.registerListener();