describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });


  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it('should show an error on invalid login', () => {
    cy.get('input[id="username"]').type('THISISNOTAUSERNAME');
    cy.get('input[id="password"]').type('1234');
    cy.get('input[value="Log In"]').click();

   
    cy.url().should('include', '/login'); 
  });
  it('should log in successfully with valid credentials', () => {
    cy.get('input[id="username"]').type('test');
    cy.get('input[id="password"]').type('1234');
    cy.get('input[value="Log In"]').click();


    cy.url().should('include', '/'); 
  });
});

describe('Add a task', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });


  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  it('should log in successfully with valid credentials', () => {
    cy.get('input[id="username"]').type('test');
    cy.get('input[id="password"]').type('1234');
    cy.get('input[value="Log In"]').click();


    cy.url().should('include', '/'); 

    cy.get('input[name="time"]').should('exist');
    cy.get('input[name="task"]').should('exist');
    
 
    cy.get('input[name="time"]').type('14:00-15:00');
    cy.get('input[name="task"]').type('New Task');
    cy.get('input[value="Add"]').click();


    cy.contains('td', '14:00-15:00').should('exist'); 
    cy.contains('td', 'New Task').should('exist');

    cy.get('input[name="time"]').type('14:00-15:00');
  cy.get('input[name="task"]').type('Task to Delete');
  cy.get('input[value="Add"]').click();


  cy.contains('td', '14:00-15:00').should('exist');
  cy.contains('td', 'Task to Delete').should('exist');


  cy.contains('tr', 'Task to Delete').click();
  cy.contains('tr', 'Task to Delete').within(() => {
    cy.get('.delete-button').click(); 
  });


  cy.contains('td', 'Task to Delete').should('not.exist');

  cy.get('img.Tableicon').click();

  cy.url().should('include', '/');
  });
  });
