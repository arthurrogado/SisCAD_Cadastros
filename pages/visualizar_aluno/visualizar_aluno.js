import HttpClient from "../../classes/Model.js"

class ClasseVisualizarAluno extends HttpClient {
    constructor(url) {
        super(url)
    }

    generateLinkedTurmasTable(selectorWhereInsert = '#turmas') {
        // Callback to delete
        const cbDeleteAlunoTurma = (item) => {        
            if(item.id) {
                visualizarAluno.APIexecuteQuery(`DELETE FROM alunos_turmas WHERE id_aluno = ${visualizarAluno.params.id} AND id_turma = ${item.id}`)
                .then(data => {
                    console.log(data)
                    if(data.status == '201') {
                        alert('Turma desvinculada com sucesso!')
                        tabelaTurmas.querySelector('tbody').querySelector('tr[rowid="'+item.id+'"]').remove()
                        this.generateUnlinkedListTurmas()
                    }
                })
            }
        }
        // Table TURMAS
        const dataPromiseTurmas = visualizarAluno.APIgetDataFromRelation('turmas', 'alunos_turmas', 'id_aluno', visualizarAluno.params.id, 'id_turma')
        dataPromiseTurmas.then(data => {
            console.log('dataPromiseTurmas')
            console.log(data)
        })
        // Function do delete link to turma
        const tabelaTurmas = visualizarAluno.createAndFillTable(dataPromiseTurmas, ['ID Turma', 'Nome', 'Ano', 'X'], false, 'dataTable', ['id', 'nome', 'ano'], cbDeleteAlunoTurma, selectorWhereInsert)
    }

    generateUnlinkedListTurmas(selectorWhereInsert = '#linkagem') {
        const cbLinkTurmaAluno = (item) => {
            if(item.id) {
                visualizarAluno.APIinsertData('alunos_turmas', {'id_aluno': visualizarAluno.params.id, 'id_turma': item.id})
                .then(data => {
                    console.log(data)
                    if(data.status == '201') {
                        listUnlinkedTurmas.querySelector('ul').querySelector('li[rowid="'+item.id+'"]').remove()
                        this.generateLinkedTurmasTable()
                    }
                })
            }
        }
        const dataPromiseNotLinked = visualizarAluno.APIgetDataNotLinked('turmas', 'alunos_turmas', 'id_aluno', visualizarAluno.params.id, 'id_turma')
        
        const listUnlinkedTurmas = visualizarAluno.buildListSearch(dataPromiseNotLinked, ['nome', 'ano'], 'Vincular turma', cbLinkTurmaAluno, selectorWhereInsert)
        console.log(listUnlinkedTurmas.querySelector('ul'))
    }

    lancarNotasFrequenciaListener() {
        document.querySelector('.form').addEventListener('submit', (e) => {
            e.preventDefault()
            // Data FormData from the form html
            let fd = new FormData(e.target)

            let body = {
                'action': 'lancarNotaAluno',
                'id_aluno': this.params.id,
                'id_turma': fd.get('id_turma'),
                'avaliacao1': fd.get('avaliacao1'),
                'avaliacao2': fd.get('avaliacao2'),
                'avaliacao3': fd.get('avaliacao3'),
                'frequencia': fd.get('frequencia'),
            }

            let formData = new FormData()
            formData.append('data', JSON.stringify(body))
            
            fetch(this.api_url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.ok) {
                    alert(data.message)
                }
            } )

        })
    }

    getNotasLancadas() {
        let form = document.querySelector('.form')
        let fd = new FormData(form)
        let body = {
            'action': 'getNotasAluno',
            'id_aluno': this.params.id,
            'id_turma': fd.get('id_turma')
        }
        let formData = new FormData()
        formData.append('data', JSON.stringify(body))

        return fetch(this.api_url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            return data.notas
        })
    }

}




const visualizarAluno = new ClasseVisualizarAluno('./visualizar_aluno.php')
const dataPromiseAluno = visualizarAluno.APIgetDataById('alunos', visualizarAluno.params.id)
visualizarAluno.createAndFillTable(dataPromiseAluno, ['#', 'Nome', 'Endereço', 'Telefone', 'Curso'], false, 'detailTable', null, false, "#details")

const dataPromiseAlunosTurmas = visualizarAluno.APIgetDataFromRelation('turmas', 'alunos_turmas', 'id_aluno', visualizarAluno.params.id, 'id_turma')
visualizarAluno.APIfillSelectByData(dataPromiseAlunosTurmas, 'id_turma', ['nome', 'ano'])

// TURMAS ___________________________________
visualizarAluno.generateLinkedTurmasTable()
visualizarAluno.generateUnlinkedListTurmas()
visualizarAluno.lancarNotasFrequenciaListener()


// Preencher as notas e frequência do aluno
let campo_id_turma = document.querySelector('#id_turma')
campo_id_turma.addEventListener('change', (e) => {
    if(e.target.value == '') {
        document.querySelector('#avaliacao1').value = ''
        document.querySelector('#avaliacao2').value = ''
        document.querySelector('#avaliacao3').value = ''
        document.querySelector('#frequencia').value =  ''     
        return
    }

    visualizarAluno.getNotasLancadas()
    .then(notas => {
        notas = notas.at(0)
        document.querySelector('#avaliacao1').value = notas.avaliacao1
        document.querySelector('#avaliacao2').value = notas.avaliacao2
        document.querySelector('#avaliacao3').value = notas.avaliacao3
        document.querySelector('#frequencia').value = notas.frequencia
    })
})