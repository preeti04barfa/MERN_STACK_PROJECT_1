import * as chai from 'chai';
import request from 'supertest';
import app from "../../server.js";

const { expect } = chai;
let refreshToken;
let userToken;
let registeredUserId; 
let taskId ;

describe('User API Tests', () => {
    describe('POST /api/user/user-add', () => {
        it('should register a new user successfully', async () => {
            const newUser = {
                name: 'Preeti Barfa',
                email: 'abcc@gmail.com', 
                number: '1234567890',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/user/user-add')
                .send(newUser);

            expect(res.status).to.equal(201); 
            expect(res.body).to.have.property('message', 'User added successfully');
            expect(res.body.data).to.have.property('email', newUser.email);
            registeredUserId = res.body.data._id; 
        });

        it('should return an error if the email already exists', async () => {
            const existingUser = {
                name: 'Jane Doe',
                email: 'kon@gmail.com',
                number: '0987654321',
                password: 'password456',
            };

            const res = await request(app)
                .post('/api/user/user-add')
                .send(existingUser);

            expect(res.status).to.equal(400); 
            expect(res.body).to.have.property('message', 'User already exist');
        });
    });

    describe('POST /api/user/user-login', () => {
        it('should log in a user successfully with correct credentials', async () => {
            const loginDetails = {
                email: 'abcc@gmail.com',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/user/user-login')
                .send(loginDetails);

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'Login Successfully');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.have.property('refreshToken');
            refreshToken = res.body.data.refreshToken;
            userToken = res.body.data.token;
        });

        it('should return an error for incorrect credentials', async () => {
            const loginDetails = {
                email: 'abcc@gmail.com',
                password: 'wrongpassword',
            };

            const res = await request(app)
                .post('/api/user/user-login')
                .send(loginDetails);

            expect(res.status).to.equal(401); 
            expect(res.body).to.have.property('message', 'Incorrect credential');
        });

        it('should return an error if the user does not exist', async () => {
            const loginDetails = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            const res = await request(app)
                .post('/api/user/user-login')
                .send(loginDetails);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'User not exist');
        });
    });

    describe('POST /api/user/refresh-token', () => {
        it('should return a new access token with a valid refresh token', async () => {
            const res = await request(app)
                .post('/api/user/referesh-token') 
                .send({ refreshToken }); 

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'Get refersh token ');
            expect(res.body.data).to.have.property('token');
        });

        it('should return an error if no refresh token is provided', async () => {
            const res = await request(app)
                .post('/api/user/referesh-token') 
                .send('');
            expect(res.status).to.equal(401); 
            expect(res.body).to.have.property('message', 'No referesh token pass');
        });

        it('should return an error for an invalid refresh token', async () => {
            const res = await request(app)
                .post('/api/user/referesh-token') 
                .send({ refreshToken: 'invalidToken' });

            expect(res.status).to.equal(403); 
            expect(res.body).to.have.property('message', 'Invalid refersh token');
        });
    });

    describe('GET /api/user/get-single-user', () => {
        it('should retrieve a single user successfully with a valid token', async () => {
            const res = await request(app)
                .get('/api/user/get-single-user')
                .set('auth', userToken);

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'get user successfully');
            expect(res.body.data).to.have.property('_id', registeredUserId); 
        });

        it('should return an error if the user does not exist', async () => {
         const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzNhZDE0ZmNlYzRlM2JmMWQyNTFkMWYiLCJpYXQiOjE3MzE5MDc5MTksImV4cCI6MTczMjUxMjcxOX0.ELNSuWiMiH-SezW_RSKzv_bscvZfOiloRZlaVaIhXV8'

            const res = await request(app)
                .get('/api/user/get-single-user')
                .set('auth', invalidToken);

            expect(res.status).to.equal(401); 
            expect(res.body).to.have.property('message', 'Token not valid');
        });

    });
});

describe('Task API Tests', () => {
    describe('POST /api/user/task-created', () => {
  
        it('should add a new task successfully', async () => {
            const newTask = {
                projectName: 'ABC',
                issueType: 'Task', 
                shortSummary: 'bshbf',
                description: 'sdbfkashd dfhasdlkfgahl kshdfg',
                priority:'Low',
                assigneer:'Preeti',
                assignedDate:'11-15-2024',
                reporter:'Preeti',
                dueDate:'11-15-2024',
                taskDuration:4
    
            };
            const res = await request(app)
                .post('/api/user/task-create')
                .set('auth', userToken)
                .send(newTask);

            expect(res.status).to.equal(201); 
            expect(res.body).to.have.property('message', 'Task created successfully');
            taskId = res.body.data._id;
            
        });
    });

    describe('GET /api/user/get-task', () => {
        it('should retrieve a all task successfully', async () => {
            const res = await request(app)
                .get('/api/user/get-task')
                .set('auth', userToken);

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'Get all task successfully');
        });

        it('should retrieve a single task successfully', async () => {
            const res = await request(app)
                .get('/api/user/get-single-task')
                .set('auth', userToken)
                .send({id:taskId})

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'Get single task successfully');
        });
      
        describe('POST /api/user/edit-task', () => {
            it('should edit a task successfully', async () => {
                const updatedTask = {
                    id: taskId, 
                    projectName: 'XYZ', 
                    issueType: 'Bug', 
                    shortSummary: 'Updated summary',
                    description: 'Updated description',
                    priority: 'High', 
                    assigneer: 'Updated Assignee',
                    assignedDate: '2024-11-16',
                    reporter: 'Updated Reporter',
                    dueDate: '2024-11-20',
                    taskDuration: 6,
                };
        
                const res = await request(app)
                    .post('/api/user/edit-task')
                    .set('auth', userToken) 
                    .send(updatedTask);
        
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message', 'Task updated Successfully'); 
                expect(res.body.data).to.have.property('_id', taskId); 
                expect(res.body.data).to.have.property('projectName', 'XYZ'); 
                expect(res.body.data).to.have.property('priority', 'High');
            });
        
            it('should return an error if the task ID is missing', async () => {
                const invalidTask = {
                    projectName: 'No ID Provided',
                };
        
                const res = await request(app)
                    .post('/api/user/edit-task')
                    .set('auth', userToken) 
                    .send(invalidTask);
        
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property('message', 'Task ID is required');
            });
        
            it('should return an error if the task does not exist', async () => {
                const nonExistentTask = {
                    id: '60c72b2f5f1b2c6d88f6eaf2',
                    projectName: 'Nonexistent Task',
                };
        
                const res = await request(app)
                    .post('/api/user/edit-task')
                    .set('auth', userToken) 
                    .send(nonExistentTask);
        
                expect(res.status).to.equal(404); 
                expect(res.body).to.have.property('message', 'Task not found'); 
            });
        });
        

    });

    describe('GET /api/user/delete-task', () => {
        it('should delete task successfully', async () => {
            const res = await request(app)
                .post('/api/user/delete-task')
                .set('auth', userToken)
                .send({id:taskId})

            expect(res.status).to.equal(200); 
            expect(res.body).to.have.property('message', 'Task Deleted Successfully');
        });

        

    });
});


