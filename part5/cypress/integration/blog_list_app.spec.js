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
});
