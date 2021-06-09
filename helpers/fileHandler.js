const fs = require('fs');
const moment = require('moment');
const csv = require('csv-parser');

const csvList = [];

async function readCsv(path) {
  return new Promise((resolve) => {
    if (csvList.length > 0) {
      console.log('cached data!');
      return resolve(csvList);
    }
    return fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => {
        const { dtDate, dLastTradePrice } = row;
        csvList.push({
          sSecurityName: row[Object.keys(row)[0]],
          dtDate: moment(dtDate, 'DD/MM/YYYY'),
          dLastTradePrice: parseFloat(dLastTradePrice)
        });
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(csvList);
      });
  });
};

module.exports = {
  readCsv
}
