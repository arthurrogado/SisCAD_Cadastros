import HttpClient from "../../classes/Model.js";

class ClassMinhasNotas extends HttpClient {
  constructor() {
    super("minhas_notas_e_frequencias");
  }

    generateLinkedTurmasTable(selectorWhereInsert = '#turmas') {
        // Table TURMAS
        const dataPromiseTurmas = this.APIgetDataFromRelation('turmas', 'alunos_turmas', 'id_aluno', this.user_id, 'id_turma')
        console.log('=-=-=-= dataPromiseTurmas')
        dataPromiseTurmas.then(turmas => {
            console.log(turmas)
            // fill select with turmas
            this.APIfillSelectByData(dataPromiseTurmas, 'id_turma', ['nome', 'ano'])
        })
    }

    getNotasLancadas() {
        let form = document.querySelector('.form')
        let fd = new FormData(form)
        let body = {
            'action': 'getNotasAluno',
            'id_aluno': this.user_id,
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


const minhas_notas = new ClassMinhasNotas()





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
    
    minhas_notas.getNotasLancadas()
    .then(notas => {
        notas = notas.at(0)
        document.querySelector('#avaliacao1').value = notas.avaliacao1
        document.querySelector('#avaliacao2').value = notas.avaliacao2
        document.querySelector('#avaliacao3').value = notas.avaliacao3
        document.querySelector('#frequencia').value = notas.frequencia
    })
})


minhas_notas.getCurrentUser()
.then(data => {
    console.log('=-=-==-=-=- DATA')
    console.log(data)
    minhas_notas.user_id = data.user.user_id
    minhas_notas.generateLinkedTurmasTable()
})