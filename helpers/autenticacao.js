import request from 'supertest';

const obterToken = async (usuario, senha) => {
    const respostaLogin = await request(baseUrl)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'password': senha
        });

    return respostaLogin.body.token;
}

module.exports = {
    obterToken
}