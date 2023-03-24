/// <reference types="cypress" />

context('Dev Finances Agilizei', () => {
    it('Cadastrar entradas', () => {
        /* - entender o fluxo manualmente
        - mapear os elementos que vamos interagir
        - descrever as interações com cypress
        - adicionar as asserções que a gente precisa */


        cy.visit('https://devfinance-agilizei.netlify.app/')

        
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 1);


    });

    it('Cadastrar saidas', () => {

        cy.get('#transaction .button').click();
        cy.get('#description').type('Pizza');
        cy.get('#amount').type(-54);
        cy.get('#date').type('2023-02-18');
        cy.get('button').contains('Salvar').click();

        cy.get('#data-table tbody tr').should('have.length', 2);

    });


});
