const pg = require("pg");
const client = new pg.Client(process.env.DB_STR);
const creds = {
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  host: process.env.host,
  idleTimeoutMillis: 10
}
const pool = new pg.Pool(creds);

const dateTime = new Date;
const year = dateTime.getFullYear();
const month = dateTime.getMonth();
const day = dateTime.getDate();
const today = new Date(year, month, day);

// write more code to figure out weeks, months, years

exports.pullData = function(closeCol, quoteName) {
  return new Promise(async(resolve, reject) => {
    try {
      const client = await pool.connect()

      const lastRes = await client.query(`SELECT date, ${closeCol} FROM index_investor order by date desc`);
      const last = lastRes.rows[0][closeCol].toFixed(2);
      const lastDate = lastRes.rows[0]['date'];
      const lastRound = Math.round(last);

      const maxRes = await client.query(`SELECT date, ${closeCol} FROM index_investor order by ${closeCol} desc`);
      const max = maxRes.rows[0][closeCol].toFixed(2);
      const maxRound = Math.round(max);
      let maxDateStr = maxRes.rows[0].date;
      const maxDateArr = maxDateStr.split('-');
      const maxDate = new Date(maxDateArr[0], maxDateArr[1]-1, maxDateArr[2]);
      maxDateStr = maxDateArr[0].toString() + maxDateArr[1].toString() + maxDateArr[2].toString(); 
      const diff = Math.abs((last - max) / max); 
      let diffPct = Math.round(diff * 100);
      let diffDays = today - maxDate;
      diffDays = diff / 86400000;
      await client.release();

      let result = {};
      result.lastDate = lastDate;
      result.cardText = `Last Close: ${last}\nMax Close: ${max}`
      if (diff === 0) {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is the all-time high!`;
        resolve(result);
      } else if (diffPct < 1) {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is less than one percent below the record high of ${maxRound}, which occurred on <say-as interpret-as="date">${maxDateStr}</say-as>`;
        resolve(result);
      } else {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is ${diffPct} percent below the record high of ${maxRound}, which occurred on <say-as interpret-as="date">${maxDateStr}</say-as>`;
        resolve(result);
      }

    } catch(e) {
      await client.release();
      reject(e);
    }
  });
}