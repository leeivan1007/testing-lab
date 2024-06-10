describe('My Todo Website Test', () => {

  // 測試新增資料
  it('Should add test data to "My Todos"', () => {
    cy.visit('/')

    cy.get('#name').type('test_name')
    cy.get('#description').type('test_description')
    cy.contains('button', 'Add Todo').click()

    cy.contains('h1', 'test_name').should('exist')
    cy.contains('span', 'test_description').should('exist')
  });

  // 測試編輯已有資料
  it('Should mark a todo as completed', () => {
    cy.visit('/');
    cy.contains('.Card--text h1', 'test_name')
      .parents('.Card')
      .within(() => {
        cy.contains('button', 'Complete')
        .should('have.class', 'Card--button__done')
        .click();
      });

    cy.contains('button', 'Complete')
    .should('have.class', 'hide-button');
  });

  // 測試刪除已有資料
  it('Should delete a todo', () => {
    cy.visit('/');

    cy.contains('.Card--text h1', 'test_name')
      .parents('.Card')
      .within(() => {
        cy.contains('button', 'Delete').click();
      });

    cy.contains('h1', 'test_name').should('not.exist');
    cy.contains('span', 'test_description').should('not.exist');
  });
})
