import { navigateTo, updateRoute } from "../js/functions.js"

function getSingularName(name) {
    if (typeof name !== 'string') return name
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
        //this.api_url = '../../classes/api.php'
        this.api_url = 'http://localhost/siscad/classes/api.php'

        // Verify login
        this.verifyLogin()
        .then(data => {
            // if in login screen, do nothing
            if(location.href.includes('login')) return
            if(!data.ok) {
                this.navigateTo('login')
                this.updateRoute('login')
            }
        })

    }

    requiredSelects = {}

    params = {}

    // Set of permissions of each menu item
    permissions = {
        'alunos': ['minhas_notas_e_frequencias', 'meu_perfil'],
        'professores': ['lancar_notas_e_frequencias', 'meu_perfil'],
        'secretaria': ['cursos', 'disciplinas', 'turmas', 'alunos'],
        'rh': ['alunos','professores'],
        'admin': ['cursos', 'disciplinas', 'turmas', 'alunos', 'professores', 'lancar_notas_e_frequencias', 'minhas_notas_e_frequencias', 'meu_perfil',]
    }

    getPermissions(type = 'admin') {
        return this.permissions[type]
    }

    getParams() {
        console.log('rota ' + location.href)
        if(!location.href.includes('?')) return
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

    verifyLogin() {
        const fd = new FormData()
        let body = {'action': 'verifyLogin'}
        fd.append('data', JSON.stringify(body))
        return fetch(this.api_url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
            /* if(!data.ok) {
                this.navigateTo('login')
                this.updateRoute('login')
            } */
            console.log(data)
            return data
        })
    }

    getCurrentUser() {
        const fd = new FormData()
        let body = {'action': 'getCurrentUser'}
        fd.append('data', JSON.stringify(body))
        return fetch(this.api_url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
    }

    logout() {
        const fd = new FormData()
        let body = {'action': 'logout'}
        fd.append('data', JSON.stringify(body))
        return fetch(this.api_url, {
            method: 'POST',
            body: fd
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.ok) {
                this.navigateTo('login')
                this.updateRoute('login')
            }
            return data
        })
    }

    getAll(url = this.baseUrl) {
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            return data
        })
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

    /* async createAndFillTable(dataPromise, headers = null, linkToDetails = false , tableClass = 'dataTable', deleteButton = false) {
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


        let dataToUse

        let promiseDataToUse = new Promise((resolve, reject) => {
            
            // Check if dataPromise is a promise, if it is resolve then make foreach, if not make foreach
            if(dataPromise instanceof Promise) {
                dataPromise
                .then(data => {
                    dataToUse = data
                    resolve()
                })
            } else {
                dataToUse = dataPromise
                resolve()
            }
        })
        await promiseDataToUse


        // dataPromise: Data in promise provided, generally from API


        // if not an array, transform it into an array
        if(!Array.isArray(dataToUse)) {
            dataToUse = [dataToUse]
        }

        console.log('dataToUse ', dataToUse)
        
        dataToUse.forEach(row => {
            console.log('row ', row)
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
                    
                    fetch(this.api_url, {
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

    } */


    
    createAndFillTable(dataPromise, headers = null, linkToDetails = false , tableClass = 'dataTable', columnsToShow = null, deleteCallbackFunction, selectorWhereInsert = 'body') {
        let contentTable = document.createElement('table')
        let tableHead = document.createElement('thead')
        let tableBody = document.createElement('tbody')
        contentTable.classList.add(tableClass)
        contentTable.appendChild(tableHead)
        contentTable.appendChild(tableBody)
        
        // If there are headers, create them in the table
        if(headers) {
            let trHead = document.createElement('tr')
            tableHead.appendChild(trHead)
            headers.forEach(header => {
                let th = document.createElement('th')
                th.innerHTML = header
                trHead.appendChild(th)
            })
        }
        
        // Insert the rows in the table
        const makeLoop = (dataToTable) => {
            console.log('makeLoop - dataToTable ', dataToTable)
            // if not an array, transform it into an array
            if(!Array.isArray(dataToTable)) {
                dataToTable = [dataToTable]
            }
                
            dataToTable.forEach(row => {
                console.log('row ', row)
                let tr = document.createElement('tr')
                tr.setAttribute('rowId', row.id)
    
                // if columnsToShow is null, show all columns, if not, show only the columns in the array
                Object.entries(row).forEach( ([key,value]) => {
                    if(!columnsToShow || columnsToShow.includes(key)) {
                        let newTd = document.createElement('td')
                        newTd.innerHTML = value
                        tr.appendChild(newTd)
                    }
                })
                
                // Adds a delete button to the row
                if(deleteCallbackFunction) {
                    let deleteButton = document.createElement('button')
                    deleteButton.innerHTML = 'Deletar'
                    deleteButton.classList.add('btn')
                    deleteButton.classList.add('btn-danger')
                    deleteButton.addEventListener('click', () => deleteCallbackFunction(row))
                    tr.appendChild(deleteButton)
                }
    
                tableBody.appendChild(tr)
                document.querySelector(selectorWhereInsert).innerHTML = ''
                document.querySelector(selectorWhereInsert).insertAdjacentElement('beforeend', contentTable)
    
                if(linkToDetails) {
                    const openDetailsPage = (id) => {
                        this.navigateTo(`visualizar_${getSingularName(linkToDetails)}`, {id: id})
                        this.updateRoute(`visualizar_${getSingularName(linkToDetails)}`, {id: id})
                    }
                    tr.addEventListener('click', e => {
                        openDetailsPage(tr.getAttribute('rowId'))
                    })
                }
            })
        }

        // Check if dataPromise is a promise, if it is resolve then make foreach, if not make foreach
        let dataToUse
        if(dataPromise instanceof Promise) {
            dataPromise
            .then(data => {
                dataToUse = data
                makeLoop(dataToUse)
            })
        } else {
            dataToUse = dataPromise
            makeLoop(dataToUse)
        }

        return contentTable

        // 1. dataPromise: Data in promise provided, generally from API
        // 2. headers: Headers of the table
        // 3. linkToDetails: If the table has a link to details page
        // 4. tableClass: Class of the table: detailTable, dataTable, etc
        // 5. columnsToShow: If you want to show only some columns, pass an array with the columns names
        // 6. deleteButton: If you want to show a delete button in the table
        // 7. selectorWhereInsert: Where to insert the table, default is body
    }

    createLinkerTable(otherTable, relationTable, relationTableMainColumn, mainId, relationTableOtherColumn, otherTableColumnsToShow = null, tableHeaders = null, selectorWhereInsert = 'body') {
        
        // Creates table that makes the link between a register and its relations
        // Example: page of professor's details with a table of his classes

        // 1. otherTable: get data from where?
        // 2. relationTable: what the table that makes the link between the other table and the main table (registry)
        // 3. relationTableMainColumn: what is the column in the relation table that has the id of the main data (registry)
        // 4. mainId: what is the id of the main data (registry)
        // 5. relationTableOtherColumn: what is the others ids from other table that must be shown in the linker table
        
        // clean the selectorWhereInsert
        document.querySelector(selectorWhereInsert).innerHTML = ''

        const openLinkerTableButton = document.createElement('button')
        var alreadyLinkedItemsTable

        ///////// Place already linked items table
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
        
        fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => {
            let relationData = response.json()
            // If there are columns to show from the other table, delete the others
            if(false /* otherTableColumnsToShow */) {
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


            alreadyLinkedItemsTable = this.createAndFillTable(relationData, tableHeaders, false, 'dataTable', otherTableColumnsToShow, true, selectorWhereInsert)
            
            openLinkerTableButton.innerHTML = 'Vincular'
            openLinkerTableButton.classList.add('outlineButton')
            // Click setted at linkerTable creation above

            alreadyLinkedItemsTable.appendChild(openLinkerTableButton)

            



            ///////// Place other items table
            // Example:
            // SELECT * FROM turmas WHERE id NOT IN (SELECT id_turma FROM professores_turmas WHERE id_professor = 2);
            // - table: turmas
            // - id_turma: relationTableOtherColumn
            // - id_professor: relationTableMainColumn
            // - 2: mainId
    
            let bodyLink = {
                'action': 'getDataNotLinked',
                'otherTable': otherTable,
                'relationTable': relationTable,
                'relationTableMainColumn': relationTableMainColumn,
                'relationTableOtherColumn': relationTableOtherColumn,
                'mainId': mainId,
            }
            let bodyLinkFd = new FormData()
            bodyLinkFd.append('data', JSON.stringify(bodyLink))
    
            fetch(this.api_url,{
                method: 'POST',
                body: bodyLinkFd
            })
            .then(response => response.json())
            .then(unlinkedItems => {
                console.log('unlinkedItems ' )
                console.log(unlinkedItems)
    
                const linkerTable = document.createElement('div')
                linkerTable.classList.add('linkerTable')
    
                openLinkerTableButton.addEventListener('click', _ => {
                    linkerTable.classList.toggle('open')
                })
    
                const linkerSearch = document.createElement('input')
                linkerSearch.setAttribute('type', 'text')
                linkerSearch.setAttribute('placeholder', 'Pesquisar')
                linkerTable.appendChild(linkerSearch)
    
                const linkerUl = document.createElement('ul')
                linkerTable.appendChild(linkerUl)
                
                const closeButton = document.createElement('button')
                closeButton.innerHTML = 'Fechar'
                closeButton.id = 'closeLinkerTable'
                closeButton.addEventListener('click', _ => {linkerTable.classList.remove('open')})
                linkerTable.appendChild(closeButton)
                
                // Items that is possible to link
                unlinkedItems.forEach(item => {
                    const linkerLi = document.createElement('li')
                    linkerLi.innerHTML = item.nome
                    linkerLi.setAttribute('rowId', item.id)
                    linkerLi.addEventListener('click', e => {
                        let body = {
                            'action': 'insert',
                            'table': relationTable,
                            'data': JSON.stringify({
                                [relationTableMainColumn]: mainId,
                                [relationTableOtherColumn]: item.id
                            })
                        }
                        let linkFd = new FormData()
                        linkFd.append('data', JSON.stringify(body))
                        fetch(this.api_url, {
                            method: 'POST',
                            body: linkFd
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            if(data.status === '201') {
                                alert(data.message)
                                console.log(alreadyLinkedItemsTable)    
                                //this.createAndFillTable(relationData, tableHeaders, false, 'dataTable', otherTableColumnsToShow, true, selectorWhereInsert)
                                this.createLinkerTable(otherTable, relationTable, relationTableMainColumn, mainId, relationTableOtherColumn, otherTableColumnsToShow, tableHeaders ,selectorWhereInsert)
                            }
                        })
                    })
    
                    linkerUl.appendChild(linkerLi)
                })
    
                document.querySelector(selectorWhereInsert).appendChild(linkerTable)
    
            })
            
        })
        

    }

    buildListSearch(dataPromise, columnsToShow = null , placeholderButton = 'Vincular', callbackFunction = null, selectorWhereInsert = 'body') {
        // Check if dataPromise is a promise, if it is resolve then make foreach, if not make foreach
        let dataToUse
        if(dataPromise instanceof Promise) {
            dataPromise
            .then(data => {
                dataToUse = data
                build(dataToUse)
            })
        } else {
            dataToUse = dataPromise
            build(dataToUse)
        }

        const totalDivSearch = document.createElement('div')
        document.querySelector(selectorWhereInsert).innerHTML = ''
        document.querySelector(selectorWhereInsert).appendChild(totalDivSearch)

        totalDivSearch.style.border = '1px solid red'

        const listSearch = document.createElement('div')
        listSearch.classList.add('listTable')
        
        const openListButton = document.createElement('button')
        openListButton.innerHTML = placeholderButton
        openListButton.classList.add('outlineButton')
        openListButton.addEventListener('click', _ => {listSearch.classList.toggle('open')})

        const searchInput = document.createElement('input')
        searchInput.setAttribute('type', 'text')
        searchInput.setAttribute('placeholder', 'Pesquisar')

        
        const listItems = document.createElement('ul')
        
        // Search function
        searchInput.addEventListener('keyup', (e) => {
            const lis = listItems.querySelectorAll('li')
            const value = e.target.value.toLowerCase()
            for(const li of lis) {
                const nome = li.innerHTML.toLowerCase()
                nome.includes(value) ? li.style.display = 'block' : li.style.display = 'none'
            }
        })
        
        const closeListButton = document.createElement('button')
        closeListButton.innerHTML = 'Fechar'
        closeListButton.addEventListener('click', _ => {listSearch.classList.remove('open')})
        
        listSearch.appendChild(searchInput)
        listSearch.appendChild(listItems)
        listSearch.appendChild(closeListButton)

        totalDivSearch.appendChild(openListButton)
        totalDivSearch.appendChild(listSearch)


        // Makes the List
        function build(dataToUse) {
            dataToUse.forEach( item => {
                console.log(item)

                const listItem = document.createElement('li')
                listItem.innerHTML = item.nome
                listItem.setAttribute('rowId', item.id)

                // if columnsToShow is null, show all columns, if not, show only the columns in the array
                Object.entries(item).forEach( ([key,value]) => {
                    if(!columnsToShow || columnsToShow.includes(key)) {
                        listItem.innerText.length > 0 ? listItem.innerHTML += " - " + value : listItem.innerHTML = value
                    }
                })

                listItems.appendChild(listItem)

                console.log('item')
                console.log(item)

                callbackFunction ? listItem.addEventListener('click', () => callbackFunction(item)) : null

            })
        }
        return totalDivSearch

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




    // APIs --------------------------------------------------------------------
    
    async APIexecuteQuery(query) {
        const body = {
            'action': 'getDataByQuery',
            'query': query
        }
        const bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))

        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
    }

    async APIgetDataByTable(table) {
        const body = {
            'action': 'getDataByTable',
            'table': table
        }
        const bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))

        return fetch(this.api_url, {
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

        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
        /* .then(data => {
            console.log(data)
            return data
        }) */
    }

    APIgetDataFromRelation(otherTable, relationTable, relationTableMainColumn, mainId, relationTableOtherColumn){
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
        
        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
    }

    APIgetDataNotLinked(otherTable, relationTable, relationTableMainColumn, mainId, relationTableOtherColumn){
        let body = {
            'action': 'getDataNotLinked',
            'otherTable': otherTable,
            'relationTable': relationTable,
            'relationTableMainColumn': relationTableMainColumn,
            'mainId': mainId,
            'relationTableOtherColumn': relationTableOtherColumn
        }
        let bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))
        
        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
    }

    APIinsertData(table, data){
        let body = {
            'action': 'insert',
            'table': table,
            'data': JSON.stringify(data)
        }
        let bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))
        
        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
    }

    APIdeleteDataById(table, id){
        let body = {
            'action': 'deleteDataById',
            'table': table,
            'id': id
        }
        let bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))
        
        return fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
    }

    APIupdateAvaliacoesEFrequencias(id_aluno, id_turma, data){
        let body = {
            'action': 'updateAvaliacoesEFrequencias',
            'id_aluno': id_aluno,
            'id_turma': id_turma,
            'data': JSON.stringify(data)
        }
        let bodyFd = new FormData()
        bodyFd.append('data', JSON.stringify(body))
        
        fetch(this.api_url, {
            method: 'POST',
            body: bodyFd
        })
        .then(response => response.json())
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

    // Using API
    APIfillSelectByData(dataPromise, select_id, columnsToShow = ['nome']) {
        const select = document.getElementById(select_id)
        if(!select) return

        // if dataPromise is a instance of Promise, then wait for it to be resolved
        if(dataPromise instanceof Promise) {
            dataPromise
            .then(data => {
                data.forEach((table)=>{
                    let option = document.createElement('option')
                    option.value = table.id
                    columnsToShow.forEach(column => {option.innerHTML += ` ${table[column]}`})
                    select.appendChild(option)
                })
            })
        }
        // if dataPromise is not a instance of Promise, then use it as data
        else {
            dataPromise.forEach((table)=>{
                let option = document.createElement('option')
                option.value = table.id
                columnsToShow.forEach(column => {option.innerHTML += ` ${table[column]}`})
                select.appendChild(option)
            })
        }

    }

}

export default HttpClient