const menuItems = document.querySelector('#menuItems')
const menus = menuItems.children

routes = {
    '/': 'home',
    '/cadastrar_curso': 'cadastrar_curso',
}


function updateRoute(route) {
    history.pushState({}, route, window.location.origin + '/siscad#' + route)
}

function navigateTo(route) {
    const currentPath = location.pathname
    let pageToOpen = `${currentPath}/pages/${route}/${route}.html`
    contentField = document.querySelector('#contentData')
    try{
        contentField.src = pageToOpen
    } catch (error) {
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

        /* contentField.addEventListener('load', () => {
            console.log('ALTERADO')
            contentField.style.height = contentField.contentWindow.document.body.scrollHeight + 'px';
        }) */

        
    })
}

if(location.pathname.startsWith('/siscad')) {

    rootRoute = location.hash.slice(1)
    updateRoute(rootRoute)

    subRoutes = rootRoute.split('/')
    let route = subRoutes[0]

    let params = {}
    // Getting the part of parameters from root of route
    subRoutes[1]?.split('&').map(param => {
        let [key, value] = param.split('=')
        params[key] = value
    })


    // Redirect to /home if the route is unavailable
    if(route === '') {
        navigateTo('home')
    } else {
        navigateTo(route)
        changeActive(route)
    }
}

