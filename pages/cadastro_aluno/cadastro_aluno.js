import HttpClient from '../../classes/Model.js'

window.addEventListener('load', () => {
    fetch('../listagem_cursos/listagem_cursos.php')
    .then(response => response.json())
    .then(cursos => {
        cursos.forEach(curso => {
            document.querySelector('#curso').innerHTML += `
                <option value='${curso.id}'>${curso.nome}</option>
            `
        });
    })
})


const cadastrarAluno = new HttpClient('./cadastro_aluno1.php')
