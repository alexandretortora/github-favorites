import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem
      ('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem
      ('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username){
    try{

      const userExists = this.entries
        .find(user => user.login === username)
      
      if(userExists){
        throw new Error('User already registered')
      }

      const user = await GithubUser.search(username)
      if(user.login === undefined){
        throw new Error('User not found')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error){
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}


export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update()
  }

  update() {
    this.removeAllTr()  

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user span').textContent = `@${user.login}`

      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Are you sure you want to remove this line?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    }) 
  }
  
  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
          <td class="user">
            <img src="https://avatars.githubusercontent.com/u/1224467?v=4" alt="Imagem do Usuário">
            <a href="https://github.com/alexandretortora" target="_blank">
              <p>Nome</p>
              <span>@nome</span>
            </a>
          </td>
          <td class="repositories">
            76
          </td>
          <td class="followers">
            9589
          </td>
          <td>
            <button class="remove">&times;</button>
          </td>
          `
    return tr
  }

  removeAllTr(){
    
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })
  }
}