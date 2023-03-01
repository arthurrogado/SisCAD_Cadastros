const form = document.querySelector('#form-cadastro-curso');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('/backend/cadastro_curso.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Tratar a resposta do backend
  })
  .catch(error => {
    // Tratar erros de conexão ou resposta inválida
  });
});
