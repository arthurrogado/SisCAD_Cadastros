import { navigateTo, updateRoute } from "../js/functions.js"

function getSingularName(name) {
    if(name.slice(-2) === 'es') {
        return name.slice(0, -2)
    }
    else if(name.slice(-1) === 's') {
        return name.slice(0, -1)
    }
    else {
        return name
    }
}

class HttpClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl
        /* this.teste = window.parent.teste
        this.teste() */
        this.navigateTo = navigateTo
        this.updateRoute = updateRoute
        this.params = this.getParams()
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

    awaitElement(selector, timeout = 2000) {
        return new Promise((resolve, reject) => {
            let element = document.querySelector(selector)
            let interval = setInterval(() => {
                if(element) {
                    clearInterval(interval)
                    resolve(element)
                }
            }, 100)
            setTimeout(() => {
                clearInterval(interval)
                reject('Timeout')
            }, timeout)
        })
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
        const body = {
            table: table,
            id: id
        }
        const fd = new FormData()
        fd.append('data', JSON.stringify(body))
        
        return fetch(url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
    }

    getDataByTable(table, url = this.baseUrl){
        const fd = new FormData()
        fd.append('table', table)
        return fetch(url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
    }
    

    placeDataById(table, id, url = this.baseUrl) {
        const tableBody = document.querySelector('tbody');
        
        this.getDataById(table, id)
        .then(data => {
            console.log(data)

            // preencher os td com o data

            const values = Object.values(data)

            const tds = document.querySelectorAll('tdoby td')

            values.forEach((value, index) => {
                tds[index].innerHTML = value
            })
            
        })
    }


    // Generic tables ---------------------------------------------------------

    createAndFillDatatable() {

    }

    createAndFillDetailtable() {

    }

    createAndFillTable(dataPromise, headers = null, linkToDetails = false , tableClass = 'dataTable', deleteButton = false) {
        let contentTable = document.createElement('table')
        let tableHead = document.createElement('thead')
        let tableBody = document.createElement('tbody')
        contentTable.classList.add(tableClass)
        contentTable.appendChild(tableHead)
        contentTable.appendChild(tableBody)

        if(headers) {
            let trHead = document.createElement('tr')
            tableHead.appendChild(trHead)
            headers.forEach(header => {
                let th = document.createElement('th')
                th.innerHTML = header
                trHead.appendChild(th)
            })
        }

        console.log('dataPromise ', dataPromise)
        // dataPromise: Data in promise provided, generally from API
        dataPromise
        .then(data => {

            // if not an array, transform it into an array
            if(!Array.isArray(data)) {
                data = [data]
            }
            
            data.forEach(row => {
                let tr = document.createElement('tr')
                tr.setAttribute('rowId', row.id)

                Object.values(row).forEach( value => {
                    let newTd = document.createElement('td')
                    newTd.innerHTML = value
                    tr.appendChild(newTd)
                })
                
                // Adds a delete button to the row
                if(deleteButton) {
                    let deleteButton = document.createElement('button')
                    deleteButton.innerHTML = 'Deletar'
                    deleteButton.classList.add('btn')
                    deleteButton.classList.add('btn-danger')
                    deleteButton.addEventListener('click', e => {
                        let body = {
                            'action': 'deleteDataById',
                            'table': table,
                            'id': tr.getAttribute('rowId')
                        }
                        let bodyFd = new FormData()
                        bodyFd.append('data', JSON.stringify(body))
                        
                        fetch('../../classes/api.php', {
                            method: 'POST',
                            body: bodyFd
                        })
                        .then(response => response.json())
                        .then(data => {
                            if(data.status === '200') {
                                alert(data.message)
                                tr.remove()
                            }
                        })
                    })
                    tr.appendChild(deleteButton)
                }

                tableBody.appendChild(tr)
                document.querySelector('body').insertAdjacentElement('afterbegin', contentTable)

                if(linkToDetails) {
                    tr.addEventListener('click', e => {
                        this.navigateTo(`visualizar_${getSingularName(table)}`, {id: tr.getAttribute('rowId')})
                    })
                }

            })
        })
    }

    createLinkerTable(otherTable, relationTable, relationTableMainColumn, mainId, relationTableOtherColumn, otherTableColumnsToShow = null, tableHeaders = null) {
        // Creates table that makes the link between a register and its relations
        // Example: page of professor's details with a table of his classes

        // 1. otherTable: get data from where?
        // 2. relationTable: what the table that makes the link between the other table and the main table (registry)
        // 3. relationTableMainColumn: what is the column in the relation table that has the id of the main data (registry)
        // 4. mainId: what is the id of the main data (registry)
        // 5. relationTableOtherColumn: what is the others ids from other table that must be shown in the linker table

        let body = {
            'action': 'getDataFromRelation',
            'otherTable': otherTable,
            'relationTable': relationTable,
            'relationTableMainColumn': relationTableMainColumn,
            'mainId': mainId,
            'relationTableOtherColumn': relationTableOtherColumn
        }
        let bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))
        
        fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFd
        })
        .then(response => {
            let relationData
            // If there are columns to show from the other table, delete the others
            if(otherTableColumnsToShow) {
                /* relationData = response.json().then(response => {
                    response.forEach(row => {
                        Object.keys(row).forEach(key => {
                            if(!otherTableColumnsToShow.includes(key)) {
                                delete row[key]
                            }
                        })
                    })
                }) */
                response.json().then(response => {
                    let novoArray = response.map(obj => {
                        return otherTableColumnsToShow.reduce((acc, prop) => {
                            if (obj.hasOwnProperty(prop)) {
                                acc[prop] = obj[prop];
                            }
                            return acc;
                        }, {});
                    });
                    relationData = novoArray
                })

            }
            else {relationData = response.json()}
            console.log(relationData)
            this.createAndFillTable(relationData, tableHeaders, false, 'dataTable', true)
        })

    }


    openDetails(table, id, url = this.baseUrl) {
        this.getDataById(table, id, url)
        .then(data => {
            console.log(data)
            for (const field in data) {
                let tr = document.querySelector(`tr[data=${field}]`)
                tr.querySelector('td').innerHTML = data[field]
            }
        })
    }




    // API --------------------------------------------------------------------
    
    async APIgetDataByTable(table) {
        const body = {
            'action': 'getDataByTable',
            'table': table
        }
        const bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))

        return fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
        /* .then(data => {
            console.log(data)
            return data
        }) */
    }

    async APIgetDataById(table, id){
        const body = {
            'action': 'getDataById',
            'table': table,
            'id': id
        }
        const bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))

        return fetch('../../classes/api.php', {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
        /* .then(data => {
            console.log(data)
            return data
        }) */
    }

    // -------------------------------------------------------------------------




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