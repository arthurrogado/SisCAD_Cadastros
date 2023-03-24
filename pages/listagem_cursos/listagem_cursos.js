import HttpClient from "../../classes/Model.js";

const listagemCursos = new HttpClient('./listagem_cursos.php')
listagemCursos.placeAll('./listagem_cursos.php')


/* const tableBody = document.querySelector('tbody')

fetch('./listagem_cursos.php')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach(curso => {
        let newLine = `<tr>
            <td>${curso.nome} </td>
            <td>${curso.descricao} </td>
            <td>${curso.coordenador} </td>
        </tr>`
        tableBody.innerHTML += newLine
    });
}) */