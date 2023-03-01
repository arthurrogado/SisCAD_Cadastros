
const btn_register = document.querySelector('#btn_register')
const form = document.querySelector('#form-cadastro');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const formData = new FormData(form);

	fetch('../../backend/cadastro_disciplina.php', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(data => {
		// Tratar a resposta do backend
		console.log(data)
		if(data.status === "Success") {
			alert('Cadastrado com sucesso!')
			const form = document.getElementById('form-cadastro')
			for (let i = 0; i < form.elements.length; i++) {
				const element = form.elements[i];
				if (element.type === 'text' || element.tagName === 'TEXTAREA') {
					element.value = '';
				}
			}
		}
	})
	.catch(error => {
	// Tratar erros de conexão ou resposta inválida
	});
});
