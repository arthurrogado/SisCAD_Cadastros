import HttpClient from "../../classes/Model.js";

const cadastroTurma = new HttpClient('./cadastro_turma.php')
cadastroTurma.requireSelectByName('dias[]')
cadastroTurma.requireSelectByName('horario')
cadastroTurma.registerListener()