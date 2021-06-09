async function test(request, reply) {
    const params = request.params;
    const query = request.query;
    return reply.status(200).send({ params, query })
  }

module.exports = test;
