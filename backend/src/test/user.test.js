import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server.js';

chai.use(chaiHttp);
const { expect } = chai;


let testUser = {
    name: "Prix",
    email: "prix.vhits@gmail.com",
    number: 8225810860,
    password: "Preeti@123",
};

let registeredUserId = "";
let testAccessToken = "";
let refreshToken = "";

describe('User  API Tests', function () {

    describe('User  Registration', () => {
        it('should register a new user', (done) => {
            chai.Request('http://localhost:3008')
                .post('/api/user/user-add')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(1);
                    expect(res.body).to.have.property('message').eql('User  registered successfully');
                    expect(res.body.data).to.have.property('_id');
                    registeredUserId = res.body.data._id;
                    done();
                });
        });

        it('should not register a user if email already exists', (done) => {
            chai.request(server)
                .post('/api/user/user-add')
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(0);
                    expect(res.body).to.have.property('message').eql('User  already exists!');
                    done();
                });
        });
    });

    describe('User  Login', () => {
        it('should log in an existing user', (done) => {
            chai.request(server)
                .post('/api/user/user-login')
                .send({ email: testUser.email, password: testUser.password })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('status').eql(1);
                    expect(res.body).to.have.property('data');
                    testAccessToken = res.body.data.token;
                    refreshToken = res.body.data.refreshToken;
                    done();
                });
        });

        it('should not log in with incorrect credentials', (done) => {
            chai.request(server)
                .post('/api/user/user-login')
                .send({ email: testUser.email, password: 'wrongPassword' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message').eql('Incorrect credentials!');
                    done();
                });
        });
    });

    describe('Refresh Token', () => {
        it('should refresh the access token', (done) => {
            chai.request(server)
                .post('/api/user/refresh-token')
                .send({ refreshToken })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.have.property('token');
                    done();
                });
        });

        it('should not refresh token with invalid refresh token', (done) => {
            chai.request(server)
                .post('/api/user/refresh-token')
                .send({ refreshToken: 'invalidToken' })
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    expect(res.body).to.have.property('message').eql('Invalid refresh token!');
                    done();
                });
        });
    });

    describe('Get Single User', () => {
        it('should retrieve a single user', (done) => {
            chai.request(server)
                .get(`/api/user/get-single-user`)
                .set('Authorization', `${testAccessToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property(' data');
                    expect(res.body.data).to.have.property('email').eql(testUser.email);
                    done();
                });
        });

        it('should not retrieve user with invalid ID', (done) => {
            chai.request(server)
                .get('/api/user/get-single-user')
                .set('Authorization', `${testAccessToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').eql('User  not found!');
                    done();
                });
        });
    });
});