import { navigateTo, updateRoute } from '../js/functions.js'
import HttpClient from '../classes/Model.js'

const httpClient = new HttpClient()
httpClient.api_url = 'http://localhost/siscad/classes/api.php'

const menuItems = document.querySelector('#menuItems')
const menus = menuItems?.children

function changeActive(targetId) {
    let target = document.querySelector(`#${targetId}`)
    // Verify if the menu is not active yet. It it is, ignore
    if(target?.classList.contains('active')){return}

    // If already exists any .active item, if not, make the new one.
    try {
        let activeItem = document.querySelector('.active')
        activeItem.classList.remove('active')
    } catch (error) {
    }
    target?.classList.add('active')
}

for(let menu of menus) {
    menu.addEventListener('click', async (e) => {
        const target = e.target

        // Verify if the item is an <li>
        if(target.tagName !== "LI") {return}

        // If the user is logged in, navigate to the page, else, redirect to login page
        let loginStatus = await httpClient.verifyLogin()
        if(loginStatus.ok) {
            changeActive(target.id)
            navigateTo(target.id)
            updateRoute(target.id)
        } else {
            alert('Você precisa estar logado para acessar essa página')
            navigateTo('login')
            updateRoute('login')
        }


    })
}

if(location.pathname.startsWith('/siscad')) {

    let rootRoute = location.hash.slice(1)
    updateRoute(rootRoute)

    let mainRoute = rootRoute.split('?')[0]
    console.log('MAIN ROUTE ', mainRoute)

    let subRoutes = rootRoute.split('?')[1]

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

// Select the menu items to show based on the user type permissions
async function showItemsByPermission() {
    let loginStatus = await httpClient.verifyLogin()
    if(loginStatus.ok) {
        let user = await httpClient.getCurrentUser()

        let userType = user.user.type
        let permissions = httpClient.getPermissions(userType)
        console.log('PERMISSIONS')
        console.log(permissions)


        for(let permission of permissions) {
            let menuItem = document.querySelector(`#${permission}`)
            menuItem.style.display = 'block'
        }
    }
    else {
        document.querySelectorAll('#menuItems > div').forEach(item => {
            item.style.display = 'none'
        })
    }
}
showItemsByPermission()

// Logout button
document.querySelector('#logout').addEventListener('click', () => {
    httpClient.logout()
    .then(() => {
        showItemsByPermission()
    })
})

export { showItemsByPermission }