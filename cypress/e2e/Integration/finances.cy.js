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

    it('Cadastrar entradas', () => {
        /* 
            - entender o fluxo manualmente
            - mapear os elementos que vamos interagir
            - descrever as interações com cypress
            - adicionar as asserções que a gente precisa 
        */


        
        // adiciona um item de entrada
        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        // verifica se tem um item na tabela
        cy.get('#data-table tbody tr').should('have.length', 1);

        



        
        




    });

    it('Cadastrar saidas', () => {

        // adiciona um item de saida
        cy.get('#transaction .button').click();
        cy.get('#description').type('Pizza');
        cy.get('#amount').type(-54);
        cy.get('#date').type('2023-02-18');
        cy.get('button').contains('Salvar').click();

        // verifica se tem 2 itens cadastrados
        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Remover entradas e saidas', () => {

        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(-50);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        
        // remove item
        cy.get('#data-table tbody tr').first().find('img').click();

        //verifica se tem um item
        cy.get('#data-table tbody tr').should('have.length', 1);

        // remove item
        cy.get('#data-table tbody tr').first().find('img').click();

        //verifica se tirou todos os itens
        cy.get('#data-table tbody tr').should('have.length', 0 );

        
    });

    it('Testes OK', () => {
        //verifica se tirou todos os itens
        cy.get('#data-table tbody tr').should('have.length', 0 );

        
    });

    
   /*  // alert
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
   */

    it.only('Validação do saldo', () => {

        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

        cy.get('#transaction .button').click();
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(-50);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();

       /*  cy.wait(2000); // espera 2 segundos */
        
        cy.get('table#data-table tbody tr').each(($el, index, $list) => {
        cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
            cy.log(text)
        }); 
      }) 


      


          
          
    });

});
