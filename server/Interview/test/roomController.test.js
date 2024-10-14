const request = require('supertest');
const app = require('../src/app');  // Your Express app

describe('Room Controller - /createRoom and /validateRoom', () => {
  let roomId;

  it('should create a new room', async () => {
    const res = await request(app)
      .post('/createRoom')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('roomId');
    roomId = res.body.roomId;
  });

  it('should validate an existing room', async () => {
    const res = await request(app)
      .get(`/validateRoom/${roomId}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it('should fail to validate a non-existent room', async () => {
    const res = await request(app)
      .get('/validateRoom/nonExistentRoom')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(false);
  });
});
