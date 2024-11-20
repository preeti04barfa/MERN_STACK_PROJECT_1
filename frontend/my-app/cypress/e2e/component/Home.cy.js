describe('Header Component Tests', () => {
  // beforeEach(() => {
    // });
    
    it('submits the form with valid inputs', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[name="email"]').type('joh86@example.com');
    cy.get('input[name="password"]').type('Pass@123');

    cy.get('button[type="submit"]').click();

    cy.get('.Toastify__toast--success').should('contain', 'Login Successfully');
    cy.get('h1').contains('Demo').should('exist');
    cy.wait(7000)
    cy.get('.login').click();
    cy.get('.Toastify__toast--success').should('contain', 'Logout successfully'); 
    cy.wait(5000)


    cy.visit('http://localhost:3000');

    cy.get('input[name="email"]').type('joh86@example.com');
    cy.get('input[name="password"]').type('Pass@123');
    cy.get('button[type="submit"]').click();
    cy.get('.Toastify__toast--success').should('contain', 'Login Successfully'); 
    cy.wait(3000)
     cy.get('.dashboard-text').click();
     cy.wait(3000)
     cy.get('.task-text').click();
     cy.wait(3000)
     cy.get('.task-btn').click();

     cy.get('input[name="projectName"]').should('exist');
     cy.get('input[name="issueType"]').should('exist');
     cy.get('input[name="shortSummary"]').should('exist');
     cy.get('input[name="description"]').should('exist');
     
     cy.get('input[name="priority"]').should('exist');
     cy.get('input[name="assigneer"]').should('exist');
     cy.get('input[name="reporter"]').should('exist');
     cy.get('input[name="assignedDate"]').should('exist');
     cy.get('input[name="dueDate"]').should('exist');
     cy.get('input[name="taskDuration"]').should('exist');
     cy.get('.cancel').click();

     cy.wait(3000)
     cy.get('.task-btn').click();
    
     cy.get('input[name="projectName"]').should('exist');
     cy.get('input[name="issueType"]').should('exist');
     cy.get('input[name="shortSummary"]').should('exist');
     cy.get('input[name="description"]').should('exist');
     cy.get('input[name="priority"]').should('exist');
     cy.get('input[name="assigneer"]').should('exist');
     cy.get('input[name="reporter"]').should('exist');
     cy.get('input[name="assignedDate"]').should('exist');
     cy.get('input[name="dueDate"]').should('exist');
     cy.get('input[name="taskDuration"]').should('exist');
     cy.get('button[type="submit"]').contains('Add Task').should('exist');

     cy.get('button[type="submit"]').click();
     cy.get('.MuiFormHelperText-root').should('contain', 'Project name is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Issue type is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Short summary is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Description is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Priority is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Assigneer is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Assigned Date is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Due Date is required');
     cy.get('.MuiFormHelperText-root').should('contain', 'Task Duration is required');

     cy.get('input[name="projectName"]').type('Zaverica');
cy.wait(3000)
     cy.get('#issue').click()
     cy.get('[data-value="Medium"]').click()
    //  cy.get('#issue').click();
    //  cy.get('#\:r19\: > [tabindex="0"]').click();
     cy.wait(2000);
    //  cy.get("[name=issue]").should("have.value", "Task");
     cy.get('input[name="shortSummary"]').type('Nothing');
     cy.get('input[name="description"]').type('Noting nothing');

     cy.get('#priority').click()
     cy.get('[data-value="Low"]').click()
    //  cy.get('#priority').type('Low');
     cy.wait(4000)

     cy.get('#assigneer').click()
     cy.get('[data-value="673473dc64ab7464c14ea23d"]').click()
    //  cy.get('#assigneer').type('Preeti');
     cy.wait(4000)
    //  cy.get('#reporter').type('Preeti');
    //  cy.wait(4000)
    cy.get('#assignedDate').type('2024-11-11');
    cy.get('#dueDate').type('2024-11-11');
     cy.get('input[name="taskDuration"]').type(8);
     cy.get('button[type="submit"]').click();
     cy.get('.Toastify__toast--success').should('contain', 'Task created successfully');

     cy.wait(3000)
     cy.get(':nth-child(1) > :nth-child(8) > [data-testid="EditIcon"]').click();

     cy.get('#priority').click()
     cy.get('[data-value="High"]').click()
     cy.get('input[name="taskDuration"]').type(4);
     cy.get('button[type="submit"]').click();
    //  cy.wait(2000)
    //  cy.get('.Toastify__toast--success').should('contain', 'Task updated successfully');
     cy.wait(3000)

     cy.get(':nth-child(1) > :nth-child(8) > [data-testid="DeleteIcon"] > path').click();
     cy.get('.close-model').click();
     cy.wait(3000)

     cy.get(':nth-child(1) > :nth-child(8) > [data-testid="DeleteIcon"] > path').click();
     cy.get('.delete-data').click();
     cy.wait(7000)

     cy.get('th').contains('Project Name').should('exist');
     cy.get('th').contains('Task Summary').should('exist');
     cy.get('th').contains('Assigned Date').should('exist');
     cy.get('th').contains('Due Date').should('exist');
     cy.get('th').contains('Assigneer').should('exist');
     cy.get('th').contains('Reporter').should('exist');
     cy.get('th').contains('Duration').should('exist');
     cy.get('th').contains('Action').should('exist');
  });
});

