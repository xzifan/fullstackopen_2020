const baseApiURL = 'http://localhost:3002/api/'
const frontendURL = 'http://localhost:3000'

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', baseApiURL+'testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', baseApiURL+'users/', user)
    cy.visit(frontendURL)
  })

  it('front page can be opened', () => {
    cy.contains('blogs')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  describe('Login',() => {
    it('login fails with wrong credentials', () => {
      cy.contains('login').click()
      cy.get('input[name=username]').type('mluukkai')
      cy.get('input[name=password]').type('wrong')
      cy.get('form.form.login>button').click()

      cy.contains('invalid username or password').should('have.css','color','rgb(255, 0, 0)')
    })

    it('login succeeds with correct credential', () => {
      cy.contains('login').click()
      cy.get('input[name=username]').type('mluukkai')
      cy.get('input[name=password]').type('salainen')
      cy.get('form.form.login>button').click()

      cy.contains('Login succeed!')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username:'mluukkai',password:'salainen' })
    })

    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('input[name=title]').type('NewBlog')
      cy.get('input[name=author]').type('A')
      cy.get('input[name=url]').type('http://url.com/randomurl')

      cy.contains('save').click()
      cy.contains('a new blog NewBlog by A added')

      cy.get('.blogList').contains('NewBlog')
    })
  })

  describe('when there is at least one blog', () => {
    beforeEach(() => {
      cy.login({ username:'mluukkai',password:'salainen' })
      cy.createBlog({ title:'A sample blog',author:'blog author',url:'http://blogurl.com' })
    })
    it('user can like a blog',() => {
      cy.contains('view').first().click()
      cy.contains('like').first().click()

      cy.contains('You liked A sample blog by blog author')
    })

    it('user can delete their own blogs',() => {
      cy.contains('view').first().click()
      cy.contains('delete').first().click()

      cy.get('A sample blog').should('not.exist')
    })

    it('other user cannot delete the blog',() => {
      const anotheruser = {
        name: 'Another',
        username: 'user',
        password: 'secret'
      }
      cy.request('POST', baseApiURL+'users/', anotheruser)

      cy.get('.btnLogout').click()

      cy.login({ username:anotheruser.username,password:anotheruser.password })
      cy.contains('view').first().click()
      cy.contains('delete').first().click()

      cy.contains('No acess to delete this blog')
    })
  })

  describe('when there is muiltiple blogs', () => {
    it('they are ordered by number of likes',() => {
      cy.login({ username:'mluukkai',password:'salainen' })
      cy.createBlog({ title:'Blog A',author:'A',url:'aa',likes:1 })
      cy.createBlog({ title:'Blog B',author:'B',url:'bb',likes:5 })
      cy.createBlog({ title:'Blog C',author:'C',url:'cc',likes:10 })
      cy.createBlog({ title:'Blog D',author:'D',url:'D',likes:6 })


      cy.get('.blogList').find('>.blogItem').then((list) => {
        cy.wrap(list).should('have.length',4)
        for(let i=0;i<list.length-1;i++){
          expect(Number(cy.wrap(list[i]).get('.likes').should('have.data','likes')))
        }
      })
    })
  })
})
