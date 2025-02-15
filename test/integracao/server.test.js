const request = require('supertest');
const assert = require('assert')
const app = require('../../src/server');
const bancoDados = require('../../src/infra/db');

describe("Testes de integracao do servidor", () => {
    /*before(async () => {
        await bancoDados.connect();
    })*/
    afterEach(async () => {
        await bancoDados.getCollection('alimentos').deleteMany();
    })
    /*after(async () => {
        await bancoDados.disconnect();
    })*/
    it("Deve retornar 404 objeto não encontrando", (done) => {
        request(app)
            .get('/api/alimento/batata')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                assert.strictEqual(res.status, 404);
                assert.strictEqual(res.text, 'Not Found');
                //console.log(err, res.body, res.text, res.status)
                done()
            });
    })

    it("Deve retornar 200 e o alimento teste após ele ser adicionado", (done) => {
        request(app)
            .post('/api/alimento')
            .send({ "name": 'teste', "protein": 1, "carb": 3, "fat": 6 })
            .end(function (err, res) {
                if (err) throw err;
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.text, 'OK');
                //console.log(err, res.body, res.text, res.status)
                request(app)
                    .get('/api/alimento/teste')
                    .end(function (err, res) {
                        if (err) throw err;
                        assert.strictEqual(res.status, 200);
                        assert.strictEqual(res.body.name, 'teste');
                        assert.strictEqual(res.body.protein, 1);
                        assert.strictEqual(res.body.carb, 3);
                        assert.strictEqual(res.body.fat, 6);
                        //console.log(err, res.body, res.text, res.status)
                        done()
                    })
            })
    })

    it("Deve retornar 404 ao buscar feijao após adicionar batata", (done) => {
        request(app)
            .post('/api/alimento')
            .send({ "name": 'batata', "protein": 3, "carb": 5, "fat": 8 })
            .end(function (err, res) {
                if (err) throw err;
                assert.strictEqual(res.status, 200);
                assert.strictEqual(res.text, 'OK');
                //console.log(err, res.body, res.text, res.status)
                request(app)
                    .get('/api/alimento/feijao')
                    .end(function (err, res) {
                        if (err) throw err;
                        assert.strictEqual(res.status, 404);
                        assert.strictEqual(res.text, 'Not Found');
                        //console.log(err, res.body, res.text, res.status)
                        done()
                    })
            })
    })
})