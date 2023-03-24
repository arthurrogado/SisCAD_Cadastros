class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    registerListener(url = this.baseUrl) {
        this.form = document.querySelector('#form-cadastro')
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault()
            
            this.formData = new FormData(this.form)
            fetch(url, {
                method: 'POST',
                body: this.formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.status === '201') {
                    alert(data.message)
                    // Limpar os campos
                    for (let i = 0; i < this.form.elements.length; i++) {
                        const element = this.form.elements[i];
                        if (element.type === 'text' || element.type === 'number' || element.tagName === 'TEXTAREA') {
                            element.value = '';
                        }
                    }
                }
            })

        })
    }

    placeAll(url) {
        const tableBody = document.querySelector('tbody');
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(line => {
                let newLine = `<tr>`
                for (const field in line) {
                    newLine += `<td>${line[field]} </td>`
                }
                newLine += `</tr>`
                tableBody.innerHTML += newLine
            });
        })
    }

}

export default HttpClient