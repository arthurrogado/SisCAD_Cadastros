const menuItems = document.querySelector('#menuItems')
const menus = menuItems.children

routes = {
    '/': 'home',
    '/cadastrar_curso': 'cadastrar_curso',
}

function alertTest() {
    alert('Test from index.js')
}

function test() {
    console.log( document.querySelector('li#home') )
}

function updateRoute(route) {
    history.pushState({}, route, window.location.origin + '/siscad#' + route)
}

function navigateTo(route, params = {}) {
    const currentPath = location.pathname
    var pageToOpen

    if(params != {}) {
        params = JSON.stringify(params).replace(/[ {}" ]/g, '').replace(':', '=')
        pageToOpen = `${currentPath}/pages/${route}/${route}.html?${params}`
        updateRoute(`${route}?${params}`)
    } else {
        pageToOpen = `${currentPath}/pages/${route}/${route}.html`
    }

    console.log('params: ', params)
    console.log(`ROTA: ${pageToOpen}`)

    contentField = document.querySelector('#contentData')
    try{
        contentField.src = pageToOpen
    } catch (error) {
        console.log('Error: ', error)
        navigateTo('home')
    }
     
}

function changeActive(targetId) {
    target = document.querySelector(`#${targetId}`)
    // Verify if the menu is not active yet. It it is, ignore
    if(target.classList.contains('active')){return}

    // If already exists any .active item, if not, make the new one.
    try {
        let activeItem = document.querySelector('.active')
        activeItem.classList.remove('active')
    } catch (error) {
    }
    target.classList.add('active')
}

for(let menu of menus) {
    menu.addEventListener('click', (e) => {
        const target = e.target
        // Verify if the item is an <li>
        if(target.tagName !== "LI") {return}

        changeActive(target.id)
        navigateTo(target.id)
        updateRoute(target.id)

    })
}

if(location.pathname.startsWith('/siscad')) {

    rootRoute = location.hash.slice(1)
    updateRoute(rootRoute)

    mainRoute = rootRoute.split('?')[0]
    console.log('MAIN ROUTE ', mainRoute)

    subRoutes = rootRoute.split('?')[1]

    let params = {}
    // Getting the part of parameters from root of route
    subRoutes?.split('&').map(param => {
        let [key, value] = param.split('=')
        params[key] = value
    })
        
    const iframe = document.querySelector('iframe')
    iframe.addEventListener('load', () => {
        // Sending the parameters to the iframe
        iframe.contentWindow.postMessage(params, '*')
    })
    

    // Redirect to /home if the route is unavailable
    if(rootRoute === '') {
        navigateTo('home')
    } else {
        navigateTo(mainRoute, params)
        changeActive(mainRoute)
    }
}
