const moment = require('moment');
const { readCsv } = require('./fileHandler');


async function cdbCalculation(investmentDate, cdbRate, currentDate){

    const csvList = await readCsv('./CDI_Prices.csv');
    const invDate = moment(investmentDate, 'YYYY-MM-DD');
    const curDate = moment(currentDate, 'YYYY-MM-DD');
    const cdbRt = cdbRate;
    let tCDIsum = 0;
    const results = [];
    const resultsOutput = [];
    let count = 0;

    for (let i = csvList.length - 1; i >= 0; i--){
        if (csvList[i].dtDate >= invDate && csvList[i].dtDate <= curDate){
            let tCDI = Math.pow(((csvList[i].dLastTradePrice / 100) + 1),(1 / 252)) - 1;
            tCDI = tCDI.toFixed(8);
            if (count === 0) {
                tCDIsum = 1 + (tCDI * (cdbRt / 100));
            }
            else {
                tCDIsum = (1 + (tCDI * (cdbRt / 100))) * results[count - 1].tCDIsum;
            }
            tCDIsum = tCDIsum.toString().match(/^-?\d+(?:\.\d{0,16})?/)[0];
    
            const dtDay = moment(csvList[i].dtDate).format('YYYY-MM-DD');
            const unitPrice = 1000 * tCDIsum;
            results[count] = {dtDay, tCDI, tCDIsum, unitPrice};
            resultsOutput[count] = {dtDay, unitPrice};
            count++;
        }

    }
    
    return resultsOutput;
};

module.exports = cdbCalculation;