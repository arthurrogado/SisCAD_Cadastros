import HttpClient from "../../classes/Model.js";

class ClasseVisualizarProfessor extends HttpClient {
    constructor(url){
        super(url)
    }

    generateLinkedTurmasTable(selectorWhereInsert = '#turmas') {
        // Callback to delete
        const cbDeleteProfessorTurma = (item) => {        
            if(item.id) {
                visualizarProfessor.APIexecuteQuery(`DELETE FROM professores_turmas WHERE id_professor = ${visualizarProfessor.params.id} AND id_turma = ${item.id}`)
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
        const dataPromiseTurmas = visualizarProfessor.APIgetDataFromRelation('turmas', 'professores_turmas', 'id_professor', visualizarProfessor.params.id, 'id_turma')
        dataPromiseTurmas.then(data => {
            console.log('dataPromiseTurmas')
            console.log(data)
        })
        // Function do delete link to turma
        const tabelaTurmas = visualizarProfessor.createAndFillTable(dataPromiseTurmas, ['ID Turma', 'Nome', 'Ano', 'X'], false, 'dataTable', ['id', 'nome', 'ano'], cbDeleteProfessorTurma, selectorWhereInsert)
    }

    generateUnlinkedListTurmas(selectorWhereInsert = '#linkagem') {
        const cbLinkTurmaProfessor = (item) => {
            if(item.id) {
                visualizarProfessor.APIinsertData('professores_turmas', {'id_professor': visualizarProfessor.params.id, 'id_turma': item.id})
                .then(data => {
                    console.log(data)
                    if(data.status == '201') {
                        listUnlinkedTurmas.querySelector('ul').querySelector('li[rowid="'+item.id+'"]').remove()
                        this.generateLinkedTurmasTable()
                    }
                })
            }
        }
        const dataPromiseNotLinked = visualizarProfessor.APIgetDataNotLinked('turmas', 'professores_turmas', 'id_professor', visualizarProfessor.params.id, 'id_turma')
        
        const listUnlinkedTurmas = visualizarProfessor.buildListSearch(dataPromiseNotLinked, ['nome', 'ano'], 'Vincular turma', cbLinkTurmaProfessor, selectorWhereInsert)
        console.log(listUnlinkedTurmas.querySelector('ul'))
    }

}



const visualizarProfessor = new ClasseVisualizarProfessor('./visualizar_professor.php');

// Table DETAILS
const dataPromiseDetail = visualizarProfessor.APIgetDataById('professores', visualizarProfessor.params.id)
visualizarProfessor.createAndFillTable(dataPromiseDetail, ['#', 'Nome', 'Endereço', 'Telefone', 'Titulação'], false, 'detailTable', null, false, "#details")


visualizarProfessor.generateLinkedTurmasTable()


// Callback function to link items
visualizarProfessor.generateUnlinkedListTurmas()
// ------------------------------
