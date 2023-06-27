import HttpClient from "../../classes/Model.js";

class listagemProfessores extends HttpClient {
    constructor() {
        super('./listagem_professores.php')
    }

    placeAllLinks(url) {
        const tableBody = document.querySelector('tbody');
        this.getAll(url)
        .then(data => {
            data.forEach(line => {

                let newtr = document.createElement('tr')
                newtr.setAttribute('rowId', line['id'])
                for (const field in line) {
                    let newtd = document.createElement('td')
                    newtd.innerHTML = line[field]
                    newtr.appendChild(newtd)
                }
                tableBody.appendChild(newtr)
            });
            this.escutadores()
        })
    }

    escutadores() {
        document.querySelectorAll('tbody tr').forEach(tr => {
            tr.addEventListener('click', (e) => {
                console.log('e.target: ', e.target)
                this.navigateTo('visualizar_professor', {id: tr.getAttribute('rowId')} )
            })
        })
    }

}


const listagem = new listagemProfessores('./listagem_professores.php')
//listagem.placeAll()
//listagem.placeAllLinks('./listagem_professores.php')

listagem.APIgetDataByTable('professores')
.then(professores => {
    listagem.createAndFillTable(professores, ['#', 'Nome', 'Endereço', 'Telefone', 'Titulação' ], 'professores', 'dataTable', ['id', 'nome', 'endereco', 'telefone', 'titulacao'], null, 'body', true)

})