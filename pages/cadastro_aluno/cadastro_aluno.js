window.addEventListener('load', () => {
    fetch('../listagem_cursos/listagem_cursos.php')
    .then(response => response.json())
    .then(cursos => {
        cursos.forEach(curso => {
            document.querySelector('#curso').innerHTML += `
                <option value='${curso.id}'>${curso.nome}</option>
            `
        });
    })
})

const form = document.querySelector('#form-cadastro')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    
    fetch('./cadastro_aluno1.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.status === '201') {
            alert(data.message)
            // Limpar os campos
            for (let i = 0; i < form.elements.length; i++) {
				const element = form.elements[i];
				if (element.type === 'text' || element.type === 'number' || element.tagName === 'TEXTAREA') {
					element.value = '';
				}
			}
        }
    })
})