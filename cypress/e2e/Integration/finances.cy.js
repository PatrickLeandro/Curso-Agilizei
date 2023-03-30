/// <reference types="cypress" />

import { format,  prepareLocalStorage} from "../Integration/utils";

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
        cy.visit('https://devfinance-agilizei.netlify.app/', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        });


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

    it('Validação do saldo', () => {

        // Clica no botão para adicionar uma nova transação
        cy.get('#transaction .button').click();
    
        // Preenche os campos da transação de entrada
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(250);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();
    
        // Clica no botão para adicionar uma nova transação
        cy.get('#transaction .button').click();
    
        // Preenche os campos da transação de saída
        cy.get('#description').type('Mesada');
        cy.get('#amount').type(-50);
        cy.get('#date').type('2023-02-17');
        cy.get('button').contains('Salvar').click();
    
        /*  cy.wait(2000); // espera 2 segundos */
    
        // Variáveis para armazenar os valores de entradas e saídas
        let incomes = 0;
        let expenses = 0;
    
        // Loop através de todas as linhas da tabela de transações
        cy.get('table#data-table tbody tr').each(($el, index, $list) => {
    
            // Extrai o valor da transação e verifica se é uma entrada ou saída
            cy.get($el).find('td.income, td.expense').invoke('text').then(text => {
    
                if (text.includes('-')) {
                    // Se for uma saída, adiciona o valor à variável 'expenses'
                    expenses = expenses + format(text)
                } else {
                    // Se for uma entrada, adiciona o valor à variável 'incomes'
                    incomes = incomes + format(text)
                }
    
                // Exibe no console os valores de entradas e saídas
                cy.log(`entradas`,incomes)
                cy.log(`saidas`,expenses)
            }); 
        })
    
        // Verifica se o valor total exibido na página está correto
        cy.get('#totalDisplay').invoke('text').then(text =>{
    
            let formattedTotalDisplay = format(text);
            let expectedTotal = incomes + expenses;
    
            // Compara o valor total exibido na página com o valor calculado
            expect(formattedTotalDisplay).to.eq(expectedTotal);
        });
    });
    

      


          
          
    
});
