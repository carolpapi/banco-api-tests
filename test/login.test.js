import request from 'supertest';
import { expect } from 'chai';

describe('Login', () => {
    describe('POST /login', () => {
        it('should return 200 for valid credentials', async () => {
            // Test logic for valid login
            const resposta = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'password': '123456'
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('token');
        });
    });
});