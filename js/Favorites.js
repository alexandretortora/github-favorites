export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)

    this.tbody = this.root.querySelector('table tbody')

    this.load()
  }

  load(){
    this.entries = [
      {
      login: 'alexandretortora',
      name: 'Alexandre Tortora',
      public_repos: '81',
      followers: '9589'
      },
      {
        login: 'mauriciosantos',
        name: 'Maurício Santos',
        public_repos: '103',
        followers: '11000'
      }
    ]
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