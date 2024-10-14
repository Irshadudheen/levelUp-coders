const request = require('supertest');
const app = require('../src/app');  // Your Express app

describe('Code Controller - /runCode', () => {
  it('should return output for valid JS code', async () => {
    const res = await request(app)
      .post('/runCode')
      .send({
        language: 'js',
        code: `console.log("Hello World");`
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('output');
    expect(res.body.output).toContain('Hello World');
  });

  it('should return error for unsupported language', async () => {
    const res = await request(app)
      .post('/runCode')
      .send({
        language: 'ruby',
        code: `puts "Hello World"`
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('Unsupported language');
  });

  it('should return error for invalid code', async () => {
    const res = await request(app)
      .post('/runCode')
      .send({
        language: 'js',
        code: `console.lo("Hello World")` // Syntax error
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toContain('eorror occure'); // You can update the message based on actual output
  });
});
