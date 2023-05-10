import HttpClient from "../../classes/Model.js";

class ClasseVisualizarProfessor extends HttpClient {
    constructor(url){
        super(url)
    }

    deleteTurma(id_professor, id_turma) {
        let bodyFormData = new FormData()
        bodyFormData.append('action', 'desvincularProfessorTurma')
        bodyFormData.append('data', JSON.stringify({'id_professor': id_professor, 'id_turma': id_turma}) )

        fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFormData
        })
        .then(response => response.json())
        .then(data => {
            this.placeTurmasFromProfessor()
        })    
    }

    placeTurmasFromProfessor() {
        let bodyFormData = new FormData()
        bodyFormData.append('action', 'echoTurmasFromProfessor')
        bodyFormData.append('data', JSON.stringify({'id': this.params.id}) )

        fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFormData
        })
        .then(response => response.json())
        .then(turmas => {

            const tableBody = document.querySelector('.turmas tbody');
            tableBody.innerHTML = ''

            turmas.forEach(curso => {
                let newLine = document.createElement('tr')
                newLine.innerHTML += `<td>${curso.id}</td>`
                newLine.innerHTML += `<td>${curso.nome}</td>`
                newLine.innerHTML += `<td>${curso.ano}</td>`

                const deleteButton = document.createElement('td')
                deleteButton.innerHTML = `<button class="btn btn-danger">Deletar</button>`
                deleteButton.addEventListener('click', () => {
                    console.log(this.params.id + ' ' + curso.id)
                    this.deleteTurma(this.params.id, curso.id)
                })

                newLine.appendChild(deleteButton)
                tableBody.appendChild(newLine)
            });
        })    
    }




    placeOtherTurmas() {
        let bodyFormData = new FormData()
        bodyFormData.append('action', 'echoAll')
        bodyFormData.append('table', 'turmas')

        fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFormData
        })
        .then(response => response.json())
        .then(turmas => {
            const pesquisa = document.querySelector('.pesquisa')
            for(const index in turmas) {
                let turma = turmas[index]

                let bodyFormData = new FormData()
                bodyFormData.set('action', 'echoDataById')
                bodyFormData.set('data', JSON.stringify({'id': turma.id_curso, 'table': 'cursos'}) )
                fetch('../../classes/api.php', {
                    method: 'POST',
                    body: bodyFormData
                })
                .then(response => response.json())
                .then(curso => {
                    let nomeCurso = curso.nome
                    let novaLi = document.createElement('li')
                    novaLi.innerHTML = `${turma.nome} - ${nomeCurso}`
                    novaLi.addEventListener('click', () => {
                        const pesquisa = document.querySelector('.pesquisa')
                        pesquisa.classList.remove('open')
                        let bodyFormData = new FormData()
                        bodyFormData.set('action', 'vincularProfessorTurma')
                        bodyFormData.set('data', JSON.stringify({'id_professor': this.params.id, 'id_turma': turma.id}) )
                        fetch('../../classes/api.php', {
                            method: 'POST',
                            body: bodyFormData
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if(data.status == '201') {
                                this.placeTurmasFromProfessor()
                            }
                        })
                    })
                    pesquisa.querySelector('ul').appendChild(novaLi)
                })

            }
        })
        
    }

}

const searchBar = document.querySelector('.pesquisa input')
searchBar.addEventListener('keyup', (e) => {
    const pesquisa = document.querySelector('.pesquisa')
    const ul = pesquisa.querySelector('ul')
    const lis = ul.querySelectorAll('li')
    const value = e.target.value.toLowerCase()
    for(const li of lis) {
        const nome = li.innerHTML.toLowerCase()
        if(nome.includes(value)) {
            li.style.display = 'block'
        } else {
            li.style.display = 'none'
        }
    }
})

document.querySelector('#vincular').addEventListener('click', () => {
    const pesquisa = document.querySelector('.pesquisa')
    pesquisa.classList.add('open')
})
document.querySelector('#fecharPesquisa').addEventListener('click', () => {
    const pesquisa = document.querySelector('.pesquisa')
    pesquisa.classList.remove('open')
})

    
const visualizarProfessor = new ClasseVisualizarProfessor('./visualizar_professor.php');
visualizarProfessor.params = visualizarProfessor.getParams()
visualizarProfessor.placeDataById('professores', visualizarProfessor.params.id)
visualizarProfessor.placeTurmasFromProfessor()
visualizarProfessor.placeOtherTurmas()

