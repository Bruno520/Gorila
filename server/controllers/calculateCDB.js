const cdbCalculation = require('../../helpers/cdbCalculation');


async function calculateCDB(request, reply) {
    const {investmentDate, cdbRate, currentDate} = request.body;
    const result = await cdbCalculation(investmentDate, cdbRate, currentDate);
    return reply.status(200).send({ result });
  }

module.exports = calculateCDB;
