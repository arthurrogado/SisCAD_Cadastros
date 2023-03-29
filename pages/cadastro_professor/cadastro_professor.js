import HttpClient from '../../classes/Model.js'

window.addEventListener('load', () => {
    fetch('../listagem_cursos/listagem_cursos.php')
    .then(response => response.json())
    .then(cursos => {
        cursos.forEach(curso => {
            document.querySelector('#cursos').innerHTML += `
            <option value='${curso.id}'>${curso.nome}</option>
            `
        });
    })
})

const tel = document.querySelector('#telefone')
if(tel) {
    tel.addEventListener('input', (e) => {
        const telefone = e.target.value.replace(/\D/g, '');
        e.target.value = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    })
}


const cadastroProfessor = new HttpClient()
cadastroProfessor.registerListener('./cadastro_professor.php')