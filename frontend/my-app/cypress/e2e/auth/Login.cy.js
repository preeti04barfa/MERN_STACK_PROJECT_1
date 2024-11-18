describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('renders the registration form with all expected elements', () => {
    cy.get('h1').contains('Welcome to Demo Project').should('exist');
    cy.get('p').contains('Login to access your account').should('exist');

    cy.get(':nth-child(1) > .MuiFormControl-root').should('have.text','Email');
    cy.get(':nth-child(2) > .MuiFormControl-root').should('have.text','Password');

    cy.get('button[type="submit"]').contains('Login').should('exist');

    cy.get('.MuiInputAdornment-root button').should('exist');

    cy.contains('Do not have an account?').should('exist');
    cy.get('a.forgot-password').contains('Register here').should('exist');
  });
  it('renders the login form', () => {
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Login').should('exist');
  });

  it('validates form fields with incorrect inputs', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.MuiFormHelperText-root').should('contain', 'Email is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
  });

  it('submits the form with valid inputs', () => {
    cy.get('input[name="email"]').type('joh86@example.com');
    cy.get('input[name="password"]').type('Pass@123');

    cy.get('button[type="submit"]').click();

    cy.get('.Toastify__toast--success').should('contain', 'Login Successfully');

    // cy.url().should('include', '/admin');
  });

  // it('toggles password visibility', () => {
  //   cy.get('input[name="password"]').should('have.attr', 'type', 'password');

  //   cy.get('.MuiInputAdornment-root button').click();

  //   cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  // });

 
});
