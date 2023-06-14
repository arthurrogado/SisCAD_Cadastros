import HttpClient from "../../classes/Model.js";

class ClasseLancarNotasEPresencas extends HttpClient {
    constructor(url) {
        super(url)
    }

    generateLinkedTurmasTable(selectorWhereInsert = '#minhas-turmas') {
        this.dataPromiseTurmas.then(turmas => {
            this.createAndFillTable(turmas, ['ID Turma', 'Nome', 'Ano'], false, 'dataTable', ['id', 'nome', 'ano'], null, selectorWhereInsert)
        })
    }

    getNotasLancadas() {
        let form = document.querySelector('.form')
        let fd = new FormData(form)
        let body = {
            'action': 'getNotasAluno',
            'id_aluno': fd.get('id_aluno'),
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

    getTurmasFromThisProfessor() {
        this.APIfillSelectByData(this.dataPromiseTurmas, 'id_turma', ['nome', 'ano'])
    }

    lancarNotasFrequenciaListener() {
        document.querySelector('.form').addEventListener('submit', (e) => {
            e.preventDefault()
            // Data FormData from the form html
            let fd = new FormData(e.target)

            let body = {
                'action': 'lancarNotaAluno',
                'id_aluno': fd.get('id_aluno'),
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

}

const clearNotasAndFrequencia = () => {
    document.querySelector('#avaliacao1').value = ''
    document.querySelector('#avaliacao2').value = ''
    document.querySelector('#avaliacao3').value = ''
    document.querySelector('#frequencia').value = ''
}

const lancarNotasEPresencas = new ClasseLancarNotasEPresencas()


// UPDATE list of Alunos when Turma is changed
document.querySelector('#id_turma').addEventListener('change', () => {

    // Clear options of alunos select and notas and frequencia
    let options = document.querySelectorAll('#id_aluno option')
    options.forEach(option => option.value != '' ? option.remove() : null)
    clearNotasAndFrequencia()

    // if turma is empty, do not fill
    if(document.querySelector('#id_turma').value == '') {return}

    // Fill alunos select by selected turma
    lancarNotasEPresencas.APIgetDataFromRelation('alunos', 'alunos_turmas', 'id_turma', document.querySelector('#id_turma').value, 'id_aluno')
    .then(data => {lancarNotasEPresencas.APIfillSelectByData(data, 'id_aluno', ['nome'])})

})

// UPDATE notas and frequencia when aluno is changed
document.querySelector('#id_aluno').addEventListener('change', () => {

    if(document.querySelector('#id_aluno').value == '') return // if aluno is empty, do nothing
    
    clearNotasAndFrequencia()

    lancarNotasEPresencas.getNotasLancadas()
    .then(notas => {
        notas = notas.at(0)
        document.querySelector('#avaliacao1').value = notas.avaliacao1
        document.querySelector('#avaliacao2').value = notas.avaliacao2
        document.querySelector('#avaliacao3').value = notas.avaliacao3
        document.querySelector('#frequencia').value = notas.frequencia
    })

})

lancarNotasEPresencas.lancarNotasFrequenciaListener()


// Wait for user info to get turmas
lancarNotasEPresencas.getCurrentUser()
.then(data => {
    console.log('=-=-=-=- OPA')
    console.log(data)
    lancarNotasEPresencas.dataPromiseTurmas = lancarNotasEPresencas.APIgetDataFromRelation('turmas', 'professores_turmas', 'id_professor', data.user.user_id, 'id_turma')
    lancarNotasEPresencas.generateLinkedTurmasTable()
    lancarNotasEPresencas.getTurmasFromThisProfessor()
})
