const menuItems = document.querySelector('#menuItems')
const menus = menuItems.children

for(let menu of menus) {
    menu.addEventListener('click', (e) => {
        const target = e.target
        // Verify if the item is an <li>
        if(target.tagName !== "LI") {return}

        // Verify if the menu is not active yet. It it is, ignore
        if(target.classList.contains('active')){return}

        // If already exists any .active item, if not, make the new one.
        try {
            let activeItem = document.querySelector('.active')
            activeItem.classList.remove('active')
        } catch (error) {
        }

        let newActive = e.target
        newActive.classList.add('active')

        let pageToOpen = `pages/${target.id}/${target.id}.html`

        contentField = document.querySelector('#contentData')
        contentField.src = pageToOpen

        contentField.addEventListener('load', () => {
            contentField.style.height = contentField.contentWindow.document.body.scrollHeight + 'px';
        })

        contentField.addEventListener('resize', () => {
            contentField.style.height = contentField.contentWindow.document.body.scrollHeight + 'px';
        })
        
    })
}