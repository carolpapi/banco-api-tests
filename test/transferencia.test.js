import request from 'supertest';
import { expect } from 'chai';
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const { obterToken } = require('../helpers/autenticacao');

describe('Transferências', () => {
    describe('POST /transferencia', () => {
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        });
        it(
            'Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$10,00',
            async () => {

                const resposta = await request(baseUrl)
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

                const resposta = await request(baseUrl)
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