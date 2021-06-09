const fastify = require('fastify');
const controllers = require('./controllers');

function Server() {
    this.fastify = fastify({ logger: true })
}

Server.prototype.listen = async function() {
    try {
        this.fastify.get('/calculateCDB/:id', controllers.test);
        this.fastify.post('/calculateCDB', controllers.calculateCDB);
        await this.fastify.listen(3000);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = Server;
