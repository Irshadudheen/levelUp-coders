jest.mock('../../src/config/redisConfig', () => ({
    redisClient: {
      on: jest.fn(),
    },
  }));

const { getValue } = require('../src/service/redisService');

describe('Redis Service', () => {
  let client;

  beforeEach(() => {
    // Mocking the Redis client
    client = {
      get: jest.fn(),
      set: jest.fn(),
    };
    redis.createClient.mockReturnValue(client);
  });

  it('should retrieve value from Redis', async () => {
    // Simulate a successful Redis `get` call
    client.get.mockImplementation((key, callback) => {
      callback(null, 'someValue');
    });

    // Call the actual function to test
    const value = await getValue('someKey');

    // Assert that the returned value is correct
    expect(value).toBe('someValue');
  });

  it('should handle Redis error', async () => {
    // Simulate an error in the Redis `get` call
    client.get.mockImplementation((key, callback) => {
      callback(new Error('Redis error'), null);
    });

    // Use `getValue` instead of `getRedisValue`
    await expect(getValue('someKey')).rejects.toThrow('Redis error');
  });
});
