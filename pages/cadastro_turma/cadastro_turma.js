import HttpClient from "../../classes/Model.js";

const cadastroTurma = new HttpClient('./cadastro_turma.php')
cadastroTurma.fillSelect('../listagem_cursos/listagem_cursos.php', 'id_curso')
cadastroTurma.requireSelectByName('dias_semana[]')
cadastroTurma.requireSelectByName('turno')
cadastroTurma.registerListener()