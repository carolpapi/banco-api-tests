import request from 'supertest';
import { expect } from 'chai';

describe('Transferências', () => {
    describe('POST /transferencia', () => {
        it(
            'Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00',
            async () => {
                // capturar o token
                const respostaLogin = await request('http://localhost:3000')
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        'username': 'julio.lima',
                        'password': '123456'
                    });

                const token = respostaLogin.body.token;

                const resposta = await request('http://localhost:3000')
                    .post('/transferencia')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        contaOrigem: 1,
                        contaDestino: 2,
                        valor: 11,
                        token: ''
                    });

                expect(resposta.status).to.equal(201);

                console.log(resposta.body);
            }
        );

        it(
            'Deve retornar falha com 422 quando o valor da transferência for abaixo de R$10,00',
            async () => {
                // capturar o token
                const respostaLogin = await request('http://localhost:3000')
                    .post('/login')
                    .set('Content-Type', 'application/json')
                    .send({
                        'username': 'julio.lima',
                        'password': '123456'
                    });

                const token = respostaLogin.body.token;

                const resposta = await request('http://localhost:3000')
                    .post('/transferencia')
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        contaOrigem: 1,
                        contaDestino: 2,
                        valor: 7,
                        token: ''
                    });

                expect(resposta.status).to.equal(422);

                console.log(resposta.body);
            }
        );
    });
});