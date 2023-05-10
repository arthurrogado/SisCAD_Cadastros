class HttpClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl
    }

    requiredSelects = {}

    params = {}

    getParams() {
        console.log('rota ' + location.href)
        location.href.split('?')[1].split('&').map((param) => {
            console.log(param)
            let [key, value] = param.split('=')
            this.params[key] = value
        })
        return this.params
    }
    
    registerListener(url = this.baseUrl) {
        this.form = document.querySelector('#form-cadastro')
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault()

            if(this.isMissingRequiredSelects()){
                alert('Preencha todos os campos obrigatórios')
                return
            }
            
            this.formData = new FormData(this.form)
            this.formData.forEach((value, key) => {
                console.log(key, value)
            })

            console.log(Array.from(this.formData))

            fetch(url, {
                method: 'POST',
                body: this.formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === '201') {
                    alert(data.message)
                    // Limpar os campos
                    for (let i = 0; i < this.form.elements.length; i++) {
                        const element = this.form.elements[i];
                        if (element.type === 'text' || element.type === 'number' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                            element.value = '';
                        } else if(element.type === 'checkbox' || element.type === 'radio') {
                            element.checked = false
                        }
                    }
                }
            })

        })
    }

    getAll(url = this.baseUrl) {
        return fetch(url)
        .then(response => response.json())
    }

    async getNameById(table, id){
        const response = await fetch(`../listagem_${table}/listagem_${table}.php`)
        const data = await response.json()
        const item = await data.find((e) => e.id === id).nome
        return item
    }

    getDataById(table, id, url = this.baseUrl){
        const fd = new FormData()
        fd.append('table', table)
        fd.append('id', id)
        return fetch(url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
    }

    placeDataById(table, id, url = this.baseUrl) {
        const tableBody = document.querySelector('tbody');
        
        this.getDataById(table, id, url)
        .then(data => {
            console.log(data)

            for (const field in data) {
                let tr = document.querySelector(`tr[data=${field}]`)
                tr.querySelector('td').innerHTML = data[field]
            }
        })
    }


    async APIgetDataById(table, id){
        const body = {
            'action': 'getDataById',
            'table': table,
            'data': {'id': id}
        }
        fetch('../../classes/api.php', {
            method: 'POST',
            body: body
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
    }

    placeAll(url) {
        const tableBody = document.querySelector('tbody');
        this.getAll(url)
        .then(data => {
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



    requireSelectByName(name){
        this.requiredSelects[name] = true
    }

    // Verify if all required selects are selected, if there is any required select, return false
    isMissingRequiredSelects(requiredSelects = this.requiredSelects) {
        for(let nam in requiredSelects) {
            console.log(nam)
        }
        for(const name in requiredSelects) {
            const select = document.getElementsByName(name)
            console.log('selects', select)
            const isSelectedAtLeastOne = Array.from(select).some((el)=>el.checked)

            // Is there any required select missing, return true (is missing required select)
            if(isSelectedAtLeastOne === false) {
                return true 
            }
        }
        // If there is no missing required select, return false (NO MISSING REQUIRED SELECT)
        return false
    }

    // Fill elements select with data from url (listagem_)
    fillSelectByID(url, id) {
        const select = document.getElementById(id)
        if(!select) return

        this.getAll(url)
        .then(data => {
            data.forEach((table)=>{
                let option = document.createElement('option')
                option.value = table.id
                option.innerHTML = table.nome
                select.appendChild(option)
            })
        })
    }

}

export default HttpClient