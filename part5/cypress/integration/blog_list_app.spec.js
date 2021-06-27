describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  describe('5.17: bloglist end to end testing, step1', function() {
    it('Login form is shown', function() {
      cy.contains('log in to application');
      cy.get('#usernameInput').parent().contains('username');
      cy.get('#passwordInput').parent().contains('password');
      cy.get('#login-button').contains('login');
    });
  });

  describe('5.18: bloglist end to end testing, step2', function() {
    beforeEach(function() {
      const user = {
        name: 'Alisher Aliev',
        username: 'username',
        password: 'password'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
    });

    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('#usernameInput').type('username');
        cy.get('#passwordInput').type('password');
        cy.get('#login-button').click();

        cy.contains('Alisher Aliev is logged in');
      });

      it('fails with wrong credentials', function() {
        cy.get('#usernameInput').type('nimi');
        cy.get('#passwordInput').type('salainen');
        cy.get('#login-button').click();

        cy.get('.error')
          .should('contain', 'invalid username or password')
          .should('have.css', 'color', 'rgb(255, 0, 0)');
      });
    });
  });

  describe('5.19: bloglist end to end testing, step3', function() {
    beforeEach(function() {
      const user = {
        name: 'Alisher Aliev',
        username: 'username',
        password: 'password'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
    });

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#usernameInput').type('username');
        cy.get('#passwordInput').type('password');
        cy.get('#login-button').click();

        cy.contains('Alisher Aliev is logged in');
      });

      it('A blog can be created', function() {
        cy.get('#create-button').contains('create new blog').click();

        cy.get('#titleInput').parent().contains('title');
        cy.get('#authorInput').parent().contains('author');
        cy.get('#urlInput').parent().contains('url');

        cy.get('#titleInput').type('Title-test');
        cy.get('#authorInput').type('Author-test');
        cy.get('#urlInput').type('Url-test');
        cy.get('#create-blog-button').contains('create').click();

        cy.get('#create-button').contains('create new blog').click();
        cy.get('.added')
          .should('contain', 'a new blog Title-test by Author-test added')
          .should('have.css', 'color', 'rgb(0, 128, 0)');
        cy.contains('Title-test Author-test');
      });
    });
  });

  describe('5.20-5.21: bloglist end to end testing, step4-5', function() {
    beforeEach(function() {
      const user = {
        name: 'Alisher Aliev',
        username: 'username',
        password: 'password'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.get('#usernameInput').type('username');
      cy.get('#passwordInput').type('password');
      cy.get('#login-button').click();

      const credentials = {
        username: 'username',
        password: 'password'
      };
      const blog = {
        title: 'title',
        author: 'author',
        url: 'url'
      };

      cy.request('POST', 'http://localhost:3003/api/login/', credentials)
        .then(response => {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs/',
            body: blog,
            headers: {
              Authorization: 'bearer ' + response.body.token
            }
          });
        });
    });

    it('User can like a blog', function() {
      cy.visit('http://localhost:3000');
      cy.contains('title author');
      cy.get('.showDetails').click();
      cy.get('.likes').contains(0);
      cy.get('.likeButton').click();
      cy.get('.likes').contains(1);
    });

    it('User can delete own blog', function() {
      cy.visit('http://localhost:3000');
      cy.contains('title author');
      cy.get('.showDetails').click();
      cy.get('.remove').click();
      cy.should('not.contain', 'title author');
    });
  });

  describe('5.22: bloglist end to end testing, step6', function() {
    beforeEach(function() {
      const user = {
        name: 'Alisher Aliev',
        username: 'username',
        password: 'password'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.get('#usernameInput').type('username');
      cy.get('#passwordInput').type('password');
      cy.get('#login-button').click();

      const credentials = {
        username: 'username',
        password: 'password'
      };

      const blogTop = {
        title: 'blog-top',
        author: 'author-top',
        url: 'url-top',
        likes: 100
      };

      const blogMid = {
        title: 'blog-mid',
        author: 'author-mid',
        url: 'url-mid',
        likes: 50
      };

      const blogBot = {
        title: 'blog-bot',
        author: 'author-bot',
        url: 'url-bot'
      };

      cy.request('POST', 'http://localhost:3003/api/login/', credentials)
        .then(response => {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs/',
            body: blogBot,
            headers: {
              Authorization: 'bearer ' + response.body.token
            }
          });
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs/',
            body: blogTop,
            headers: {
              Authorization: 'bearer ' + response.body.token
            }
          });
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs/',
            body: blogMid,
            headers: {
              Authorization: 'bearer ' + response.body.token
            }
          });
        });
    });

    it('User can like a blog', function() {
      cy.visit('http://localhost:3000');
      cy.get('#blog-entries').get('.showDetails')
        .then(c => {
          c.click();
        });
      cy.get('#blog-entries').find('.likes')
        .then(c => {
          expect(c[0]).to.contain(100);
          expect(c[1]).to.contain(50);
          expect(c[2]).to.contain(0);
        });
    });
  });
});
