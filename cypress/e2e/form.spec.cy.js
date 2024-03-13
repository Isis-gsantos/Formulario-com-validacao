/// <reference types="Cypress" />

describe('Form Testing', () => {
  
  const longText = Cypress._.repeat('Teste Teste Teste Teste Teste ', 10)

  beforeEach(()=>{
    cy.visit('./index.html')
  })

  it('Checks the page title', ()=> {
    cy.title().should('be.equal', 'Formulário com Validação')
  })
  
  it('Fill the form correctly and sends it', () => {
    cy.get('#nome-completo').type('Lucas Marco').should('have.value', 'Lucas Marco')
    cy.get('#email').type('lucas@gmail.com').should('have.value', 'lucas@gmail.com')
    cy.get('#telefone').type('999999999').should('have.value', '999999999')
    cy.get('#mensagem').type(longText, {delay: 0}).should('have.value', longText)
    cy.get('#submit').click()
    cy.get('#nome-completo').should('have.css', 'background-color', 'rgb(60, 204, 135)')
  })
})