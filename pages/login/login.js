import HttpClient from "../../classes/Model.js";
//import { showItemsByPermission } from "../../js/index.js";

class ClasseLogin extends HttpClient {
    constructor(url) {
        super(url)
    }

    login() {
        let form = document.querySelector('.form')
        
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('SUBMIT LOGIN')
            let dataFd = new FormData(form)

            let fd = new FormData()
            let body = {
                'action': 'login',
                'usuario': dataFd.get('usuario'),
                'senha': dataFd.get('senha'),
                'type': dataFd.get('type')
            }
            fd.append('data', JSON.stringify(body))

            fetch(this.api_url, {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.ok) {
                    //showItemsByPermission()
                    // reload page
                    document.parentElement.window.location.reload()
                }
            })

        })
    }
    
}

const Login = new ClasseLogin()

Login.login()

document.querySelector('#verify').addEventListener('click', () => {
    Login.verifyLogin()
})

document.querySelector('#logout').addEventListener('click', () => {
    Login.logout()
})