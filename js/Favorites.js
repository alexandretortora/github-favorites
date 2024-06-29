export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem
      ('@github-favorites:')) || []
    
    // this.entries = [
    //   {
    //   login: 'alexandretortora',
    //   name: 'Alexandre Tortora',
    //   public_repos: '81',
    //   followers: '9589'
    //   },
    //   {
    //     login: 'mauriciosantos',
    //     name: 'Maurício Santos',
    //     public_repos: '103',
    //     followers: '11384'
    //   }
    // ]
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
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
      row.querySelector('.user span').textContent = `@${user.login}`

      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja remover essa linha?')
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