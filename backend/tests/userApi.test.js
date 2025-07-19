const request = require('supertest');
const { app } = require('../server');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Mock user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  location: 'Test City',
  bio: 'Test bio',
};

// Connect to test database before tests
beforeAll(async () => {
  // Use a test database
  const url = process.env.MONGO_URI || 'mongodb://localhost:27017/book-exchange-test';
  await mongoose.connect(url);
});

// Clean up after tests
afterAll(async () => {
  // Remove test user
  await User.deleteMany({ email: testUser.email });
  await mongoose.connection.close();
});

describe('User API', () => {
  let token;

  test('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(testUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.name).toEqual(testUser.name);
    expect(res.body.email).toEqual(testUser.email);
  });

  test('Should login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(testUser.name);
    expect(res.body.email).toEqual(testUser.email);
  });

  test('Should update user profile', async () => {
    const updatedBio = 'Updated bio';
    
    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bio: updatedBio,
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.bio).toEqual(updatedBio);
  });
});