
function teste() {
    console.log('TESTE DE IMPORTAÇÃO')
    alert('funfou a importação')
}

function makeUrlParams(params) {
    let urlParams = params ? '?' : ''
    for(let param in params) {
        urlParams += `${param}=${params[param]}&`
    }
    return urlParams
}

function updateRoute(route, params = null) {
    params = makeUrlParams(params)
    console.log('**** PARAMS: ', params)
    history.pushState({}, route, window.location.origin + '/siscad#' + route + params)
}

function navigateTo(route, params = {}) {
    const currentPath = 'siscad' //location.pathname
    
    var pageToOpen

    if(params != {}) {
        //params = JSON.stringify(params).replace(/[ {}" ]/g, '').replace(':', '=')
        params = makeUrlParams(params)
        pageToOpen = `${window.location.origin}/${currentPath}/pages/${route}/${route}.html${params}`
        //updateRoute(`${route}?${params}`)
    } else {
        pageToOpen = `${window.location.origin}/${currentPath}/pages/${route}/${route}.html`
    }

    console.log('params: ', params)
    console.log(`ROTA: ${pageToOpen}`)


    try{
        let contentField = document.querySelector('#contentData')
        contentField.src = pageToOpen
    } catch (error) {
        console.log('Error: ', error)
        //navigateTo('home')
        
        window.location.href = pageToOpen

    }
}


export { updateRoute, navigateTo, teste}