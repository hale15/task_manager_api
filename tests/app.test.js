const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Create a simple test app
// We do not connect to the real database in tests
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Manager API is running',
    status: 'healthy'
  });
});

// TEST SUITE — a group of related tests
describe('API Health Check', () => {

  // TEST 1 — check the root endpoint returns 200
  it('should return 200 and healthy status', async () => {
    const response = await request(app).get('/');
    
    // EXPECT — what we expect to happen
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task Manager API is running');
    expect(response.body.status).toBe('healthy');
  });

  // TEST 2 — check unknown routes return 404
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
  });

});