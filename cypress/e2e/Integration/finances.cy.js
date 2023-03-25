/// <reference types="cypress" />

context('Dev Finances Agilizei', () => {

    /* 
                     Hooks são:
    Trechos de código que executão antes e depois do teste
    before -> antes de cada teste
    beforeEach -> antes de cada teste
    after -> depois de todos os testes
    afterEach -> depois de cada teste
    */

    beforeEach(() =>{
        cy.visit('https://devfinance-agilizei.netlify.app/');
        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it.only('Cadastrar entradas', () => {
        /* - entender o fluxo manualmente
        - mapear os elementos que vamos interagir
        - descrever as interações com cypress
        - adicionar as asserções que a gente precisa */


        
        
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1);

        cy.get('#transaction .button').click();
        cy.get('#description').type('Pizza');
        cy.get('#amount').type(-54);
        cy.get('#date').type('2023-02-18');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 2)

        /* cy.get('#data-table [Transaction.remove(0)]').click(); */
        cy.get('#data-table tbody tr').first().find('img').click();

        
        cy.get('#data-table tbody tr').should('have.length', 1);

        
        cy.get('#data-table tbody tr').first().find('img').click();

        
        cy.get('#data-table tbody tr').should('have.length', 0 );
        Cypress.on('test:after:run', (test, runnable) => {
            if (test.state === 'failed') {
              // exibe um alert somente se algum teste falhar
              alert(`Teste falhou: ${test.title}`)
            }
          })
          
          Cypress.on('run:end', () => {
            // exibe um alert ao final de todos os testes
            alert('Testes concluídos')
          })
          
        




    });

    /* it('Cadastrar saidas', () => {
        
        cy.visit('https://devfinance-agilizei.netlify.app/')

        cy.get('#transaction .button').click();
        cy.get('#description').type('Pizza');
        cy.get('#amount').type(-54);
        cy.get('#date').type('2023-02-18');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1);

    }); */


});
