import request from 'supertest';
const postLogin = require('../fixtures/postLogin.json');

const obterToken = async (usuario, senha) => {
    const bodyLogin = {...postLogin};
    const respostaLogin = await request(baseUrl)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

    return respostaLogin.body.token;
}

module.exports = {
    obterToken
}