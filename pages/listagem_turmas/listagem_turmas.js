import HttpClient from "../../classes/Model.js";

class listagemTurmasClient extends HttpClient {
    constructor() {
        super('./listagem_turmas.php')
    }

    async placeAllReplacingName(url, config = {}) {
        const tableBody = document.querySelector('tbody')
        const dias_semana = {
            '2': 'Segunda-feira',
            '3': 'Terça-feira',
            '4': 'Quarta-feira',
            '5': 'Quinta-feira',
            '6': 'Sexta-feira',
            '7': 'Sábado'
        }

        const data = await this.getAll(url)
        for(const line of data) {
            const newLine = document.createElement('tr')

            for (var column in line) {

                if(column == 'id_curso') {
                    column = await this.getNameById('cursos', line[column])
                }
                else if (column == 'dias_semana') {
                    column = line[column].split(',').map((el) => dias_semana[el]).join(', ')
                }
                else {
                    column = line[column]
                }
                const td = document.createElement('td')
                td.innerHTML = column
                newLine.appendChild(td)
                tableBody.appendChild(newLine)
            }

        }

    }
}

const listagemTurmas = new listagemTurmasClient('./listagem_turmas.php')

const config = {
    'id_curso' : listagemTurmas.getNameById,
    'dias_semana' : (dias) => {
        console.log('***** DIAS', dias)
        
    }
}


listagemTurmas.placeAllReplacingName('./listagem_turmas.php', config);

// function to transform numeros into dias da semana
function transformDias(dias) {
    const dias_semana = {
        '2': 'Segunda-feira',
        '3': 'Terça-feira',
        '4': 'Quarta-feira',
        '5': 'Quinta-feira',
        '6': 'Sexta-feira',
        '7': 'Sábado'
    }
    return dias.split(',').map((el) => dias_semana[el]).join(', ')
}

listagemTurmas.getAll()
.then(turmas => {
    console.log('***** TURMAS', turmas)
    // iterate turmas, for each turma, transform dias_semana into dias da semana
    turmas.forEach(turma => {
        turma.dias_semana = transformDias(turma.dias_semana)
    })

    listagemTurmas.createAndFillTable(turmas, ['#', 'Nome turma', 'Curso', 'Período', 'Dias da semana', 'Turno'], 'turmas', 'dataTable', ['id', 'nome', 'id_curso', 'periodo', 'dias_semana', 'turno'], null, 'body', true)
})