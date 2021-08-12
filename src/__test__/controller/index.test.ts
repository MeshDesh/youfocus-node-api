import supertest from 'supertest';
import app from '../../app';

const BASE_API_URL = '/api/v1';
const request = supertest(app);

// 1. Get status
describe('Get status', () => {
  it('1. Should get status', async done => {
    const response = await request.get(`${BASE_API_URL}/test`);

    expect(response.statusCode).toEqual(200);

    const { status } = response.body;

    expect(status).toEqual(true);

    done();
  });
});
