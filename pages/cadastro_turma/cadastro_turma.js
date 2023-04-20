import HttpClient from "../../classes/Model.js";

const cadastroTurma = new HttpClient('./cadastro_turma.php')
cadastroTurma.fillSelectByID('../listagem_cursos/listagem_cursos.php', 'id_curso')
cadastroTurma.fillSelectByID('../listagem_disciplinas/listagem_disciplinas.php', 'id_disciplinas[]')
cadastroTurma.requireSelectByName('dias_semana[]')
cadastroTurma.requireSelectByName('turno')
cadastroTurma.registerListener()