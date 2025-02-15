const bancoDados = require('../src/infra/db');

module.exports.mochaHooks = {
    async beforeAll() {
        console.log(process.env.MONGO_DATABASE_URL);
        await bancoDados.connect();
    },
    async afterAll() {
        await bancoDados.disconnect();
    }
}