const tableBody = document.querySelector('tbody')

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
})