const request = require('supertest');
const ServerlessApiGatewayLocal = require('../app');

describe('ServerlessApiGatewayLocal', () => {
  let gateway;

  beforeAll(() => {
    gateway = new ServerlessApiGatewayLocal();
    gateway.start();
  });

  it('should initialize without errors', () => {
    expect(gateway).toBeDefined();
  });

  it('should respond to configured endpoints', async () => {
    const response = await request(gateway.app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello from local Lambda!' });
  });

  it('should handle POST requests with body', async () => {
    const response = await request(gateway.app)
      .post('/echo')
      .send({ data: 'test' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ echoed: { data: 'test' } });
  });

  it('should return 404 for undefined routes', async () => {
    const response = await request(gateway.app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});