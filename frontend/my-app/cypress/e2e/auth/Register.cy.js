describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('renders the registration form with all expected elements', () => {
    cy.get('h1').contains('Welcome to Demo Project').should('exist');

    cy.get(':nth-child(1) > .MuiFormControl-root').should('have.text','Name');
    cy.get(':nth-child(2) > .MuiFormControl-root').should('have.text','Number');
    cy.get(':nth-child(3) > .MuiFormControl-root').should('have.text','Email');
    cy.get(':nth-child(4) > .MuiFormControl-root').should('have.text','Password');

    cy.get('button[type="submit"]').contains('Register').should('exist');

    cy.get('.MuiInputAdornment-root button').should('exist');

    cy.contains('Already have an account?').should('exist');
    cy.get('a.forgot-password').contains('Login here').should('exist');
    cy.wait(5000)
    // cy.get('.forgot-password').click()
    // cy.wait(7000)

    // cy.contains('Do not have an account?').should('exist');
    // cy.get('a.forgot-password').contains('Register here').should('exist');
    // cy.get('.forgot-password').click()
    // cy.wait(7000)

  });

  it('renders the registration form', () => {
    cy.get('input[name="name"]').should('exist');
    cy.get('input[name="number"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Register').should('exist');
  });

  it('validates form fields with incorrect inputs', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.MuiFormHelperText-root').should('contain', 'Name is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Phone number is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Email is required');
    cy.get('.MuiFormHelperText-root').should('contain', 'Password is required');
  });

  it('validates specific field errors for invalid inputs', () => {
    cy.get('input[name="name"]').type('J');
    cy.get('input[name="number"]').type('12345');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('short');

    cy.get('button[type="submit"]').click();

    cy.get('.MuiFormHelperText-root').should('contain', 'Name must be at least 2 characters');
    cy.get('.MuiFormHelperText-root').should('contain', 'Phone number must be exactly 10 digits');
    cy.get('.MuiFormHelperText-root').should('contain', 'Invalid email address');
    cy.get('.MuiFormHelperText-root').should('contain', 'Password must be at least 6 characters');
  });

  it('submits the form with valid inputs', () => {
    cy.get('input[name="name"]').type('John');
    cy.get('input[name="number"]').type('9876543210');
    cy.get('input[name="email"]').type('ak@example.com');
    cy.get('input[name="password"]').type('Pass@123');

    cy.get('button[type="submit"]').click();

    cy.get('.Toastify__toast--success').should('contain', 'User added successfully');

    cy.url().should('include', '/');
    cy.wait(3000)
  });

  it('toggles password visibility', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');

    cy.get('.MuiInputAdornment-root button').click();

    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  });

 
});
