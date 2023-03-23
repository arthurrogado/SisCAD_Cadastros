
const btn_register = document.querySelector('#btn_register')
const form = document.querySelector('#form-cadastro');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const formData = new FormData(form);

	fetch('./cadastro_disciplina.php', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(data => {
		// Tratar a resposta do backend
		if(data.status === "201") {
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
	.catch(error => {
	// Tratar erros de conexão ou resposta inválida
	});
});
