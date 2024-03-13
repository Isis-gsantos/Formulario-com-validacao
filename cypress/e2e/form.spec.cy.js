/// <reference types="Cypress" />

describe('Form Testing', () => {
  
  const longText = Cypress._.repeat('Teste Teste Teste Teste Teste ', 10)
  const breakingText = Cypress._.repeat('Teste Teste Teste Teste Teste ', 100)
  const red = 'rgb(245, 46, 46)'
  const green = 'rgb(0, 194, 43)'

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
    
    cy.get('#nome-completo').should('have.css', 'border-color', green)
    cy.get('#email').should('have.css', 'border-color', green)
    cy.get('#telefone').should('have.css', 'border-color', green)
    cy.get('#mensagem').should('have.css', 'border-color', green)

    // The tests are passing but there is no user feedback that the form was sent. See 'Report-form.txt' for more details.
  })

  it('Fill the form incorrectly and sends it', () => {
    cy.get('#nome-completo').type('Lucas Marco').should('have.value', 'Lucas Marco')
    cy.get('#email').type('lucas@.com').should('have.value', 'lucas@.com')
    cy.get('#telefone').type(' ').should('have.value', ' ')
    cy.get('#mensagem').type(longText, {delay : 0}).should('have.value', longText)
    
    cy.get('#submit').click()
    
    cy.get('#nome-completo').should('have.css', 'border-color', green)
    cy.get('#email').should('have.css', 'border-color', green)
    cy.get('#telefone').should('have.css', 'border-color', red) 
    cy.get('#mensagem').should('have.css', 'border-color', green) 

    // The test fails since the telefone accepts non-numerical characters and all other accept blank spaces. See 'Report-form-2.txt' for more details.
  })

  it('Not writing any information on the fields and sending it', () => {   
    cy.get('#submit').click()
    
    cy.get('#nome-completo').should('have.css', 'border-color', red)
    cy.get('#email').should('have.css', 'border-color', red)
    cy.get('#telefone').should('have.css', 'border-color', red) 
    cy.get('#mensagem').should('have.css', 'border-color', red)
  })

  it.only('Testing the capacity of the message form', ()=> {
    cy.get('#mensagem').type(breakingText, {delay : 0}).should('have.value', breakingText)
  })
})