import HttpClient from "../../classes/Model.js";

const listagemAlunos = new HttpClient('./listagem_alunos.php')
//listagemAlunos.placeAll('./listagem_alunos.php')

async function main() {
    let alunos = await listagemAlunos.getAll()
    listagemAlunos.createAndFillTable(alunos, ['#', 'Nome', 'Endereço', 'Telefone', 'Curso'], 'alunos')
}
main()