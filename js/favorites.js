import { GithubUser } from "./gitHubUser.js"
//  classe que vai conter a lógica dos dados
export class Favorites {
//              3° #app vai para o contructor
    constructor(root) {
//              4° #app vai para o root 
        this.root = document.querySelector(root)
        this.load()
    }   

    load() {
//  JSON.parte vai transformar o meu Json em um objeto
        this.entries = JSON.parse(localStorage.getItem('@github-favorites')) || []
    }
    save() {
        localStorage.setItem('@github-favorites', JSON.stringify(this.entries))
    }

//      4° 'username' é o 'valor' que veio da função 'onadd'
    async add(username){
//      5°  vai criar uma função async   
      try {
//  se o 'find' encontrar o elemento vai retornar verdadeiro como objeto e não mais um array
            const userExists = this.entries.find(entry => entry.login === username)
//  se o usuário já for existente vai disparar um error e um alert na tela.           
            if(userExists) {
                throw new Error('Usuário já cadastrado')
            }
//  caso seja falso o userexists, vai ser feita a procura no github       
            const user = await GithubUser.search(username)
//  se o usuário não for encontrado e retornar undefined, entra nessa validão e dispara outro alerta.
            if(user.login === undefined) {
               throw new Error('Usuário não encontrado!')
            }
//  vai pegar o user que foi pego acima e colocar nesse novo array como 1° item
            this.entries = [user, ...this.entries]
            this.update()
            this.save()
        } catch(error) {
            alert(error.message)
        }
    }

    delete(user){
//  se o filter for executado e o retorno for falso, ele vai deletar o item do array em questão
//  o filtro vai pegar todas as entradas que tiver no array, menos a que passar na função
        const filteredEntries = this.entries.filter( entry => entry.login !== user.login )

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}

//  classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
//      1° #app vai para o contructor
    constructor(root) {
//      2° #app vai para o super
        super(root)

        this.tbody = this.root.querySelector('table tbody')
//  this quando vai chamar uma função 
        this.update()
        this.onadd()
    }

    onadd() {
//      1° pega selector do button
        const addButton = this.root.querySelector('.search button')
//      2° faz um evento de click, onde vai pegar o value que vier do dado inserido no input
        addButton.onclick = () => {
            const {value} = this.root.querySelector('.search input')
//      3° vai passar esse value como paramêtro para a função 'add'
            this.add(value)
        }
    }

    update(){
//  para usar uma função dentro de outro escopo, precisa instanciar, ou seja usar o this.
        this.removeAllTr()

//  os meus users foram para dentro do objeto 'entries' e com o 'forEach' eu vou fazer algo com eles
    this.entries.forEach(user => {
//      4° o tr que está como return da createRow vai para dentro do objeto 'row'
        const row = this.createRow()
//  mudando os dados do HTML que foram criados com a DOM
//                                                   user tá vindo da função dentro do forEach
        row.querySelector('.user img').src = `https://github.com/${user.login}.png`
        row.querySelector('.user img').alt = `Imagem de ${user.name}`
        row.querySelector('.user a').href = `https://github.com${user.login}`
        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.followers').textContent = user.followers
        row.querySelector('.remove').onclick = () => {
//  'confirm' retorna um valor booleano
            const isOk = confirm('Tem certeza que deseja deletar essa linha ?')
            if (isOk) {
                this.delete(user)
            }
        }
//      5° row vai para dentro do 'append'
//  'append' é uma funcionalidade da Dom, que vai receber um elemento html que tbm foi criado pela Dom 
        this.tbody.append(row)
//  O append insere um registro após o último elemento, ou seja, ele é útil quando é preciso colocar o novo registro na última posição da tabela.
    })
}

    createRow() {
//  criando elemento direto pela dom
//  usa o createElement e diz qual o nome do elemento a ser criado dentro dos paramêtro
//      1° cria o elemento
        const tr = document.createElement('tr')
//      2° cria o conteúdo e joga para dentro do elemento usando 'InnerHTML'
        tr.innerHTML = `
            <td class="user"><!-- td- Colunas do Body -->
                <img src="https://github.com/Matteus1983.png" alt="Imagem do Mateus">
                <a href="https://github.com/Matteus1983" target="_blank">
                    <p>Mateus Moura</p>
                    <span>Matteus1983</span>
                </a>
            </td>

            <td class="repositories">
                21
            </td>

            <td class="followers">
                4
            </td>

            <td>
                <button class="remove">Remover</button>
            </td>
        `
//      3° retorna o tr para fora da função
        return tr
}

    removeAllTr() {
//  forEach, para cada 'tr', executa oque está dentro do paramêtro que nesse caso é uma função   
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}
