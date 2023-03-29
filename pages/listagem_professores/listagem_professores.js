import HttpClient from "../../classes/Model.js";

class listagemProfessores extends HttpClient {
    constructor() {
        super('./listagem_professores.php')
    }

    placeAllLinks(url) {
        this.getAll(url)
        .then(data => {
            data.forEach(line => {
                let newLine = `<tr>`
                for (const field in line) {
                    newLine += `<td> <a href=#> ${line[field]} </a> </td> `
                }
                newLine += `</tr>`
                tableBody.innerHTML += newLine
            });
        })

    }

}

const listagem = new listagemProfessores('./listagem_professores.php')
listagem.placeAll()