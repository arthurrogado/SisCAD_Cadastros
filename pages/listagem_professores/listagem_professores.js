import HttpClient from "../../classes/Model.js";

/* const navigateTo = window.parent.navigateTo
const updateRoute = window.parent.updateRoute */

/* function updateRoute(route) {
    history.pushState({}, route, window.location.origin + '/siscad#' + route)
}

function navigateTo(route, params = {}) {
    const currentPath = 'siscad' //location.pathname
    
    var pageToOpen

    if(params != {}) {
        params = JSON.stringify(params).replace(/[ {}" ]/g, '').replace(':', '=')
        pageToOpen = `${window.location.origin}/${currentPath}/pages/${route}/${route}.html?${params}`
        //updateRoute(`${route}?${params}`)
    } else {
        pageToOpen = `${window.location.origin}/${currentPath}/pages/${route}/${route}.html`
    }

    console.log('params: ', params)
    console.log(`ROTA: ${pageToOpen}`)

    try{
        contentField = document.querySelector('#contentData')
        contentField.src = pageToOpen
    } catch (error) {
        console.log('Error: ', error)
        //navigateTo('home')
        
        window.location.href = pageToOpen

    }
} */

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
listagem.createAndFillTable(listagem.APIgetDataByTable('professores'), ['#', 'Nome', 'Endereço', 'Telefone', 'Titulação' ], true)

listagem.APIgetDataById('professores', 2)
.then(data => {
    console.log('data: ', data)
})