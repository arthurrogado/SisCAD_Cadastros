const menuItems = document.querySelector('#menuItems')
const menus = menuItems.children

routes = {
    '/': 'home',
    '/cadastrar_curso': 'cadastrar_curso',
}

dataTest = {
    routeInicio: '',
    routeBotao: ''
}

function updateRoute(route) {
    history.pushState({}, route, window.location.origin + '/siscad#' + route)
}

function navigateTo(route) {
    const currentPath = location.pathname
    let pageToOpen = `${currentPath}/pages/${route}/${route}.html`
    console.log('pageToOpen: ' + pageToOpen)
    contentField = document.querySelector('#contentData')
    contentField.src = pageToOpen
    updateRoute(route)   
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


if(location.pathname.startsWith('/siscad')) {
    let route = location.hash.slice(1)
    if(route === '') {
        navigateTo('home')
    } else {
        navigateTo(route)
        changeActive(route)
    }
}
    


for(let menu of menus) {
    menu.addEventListener('click', (e) => {
        const target = e.target
        // Verify if the item is an <li>
        if(target.tagName !== "LI") {return}

        changeActive(target.id)
        
        navigateTo(target.id)

        /* contentField.addEventListener('load', () => {
            console.log('ALTERADO')
            contentField.style.height = contentField.contentWindow.document.body.scrollHeight + 'px';
        }) */

        
    })
}