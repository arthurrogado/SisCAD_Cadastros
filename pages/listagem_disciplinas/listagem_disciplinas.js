const tableBody = document.querySelector('tbody')

fetch('./listagem_disciplinas.php')
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach(disciplina => {
        let newLine = `<tr>
            <td>${disciplina.nome} </td>
            <td>${disciplina.carga_horaria} </td>
            <td>${disciplina.ementa} </td>
            <td>${disciplina.bibliografia} </td>
            <td>${disciplina.pre_requisito} </td>
        </tr>`
        tableBody.innerHTML += newLine
    });
})