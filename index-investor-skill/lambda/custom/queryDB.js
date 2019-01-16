const pg = require("pg");
const creds = {
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  host: process.env.host,
  idleTimeoutMillis: 10
}
const pool = new pg.Pool(creds);

function getDiff(last, other) {
  const diff = (last - other) / other;
  const diffPct = (diff * 100).toFixed(2);
  let diffSign;
  if (diffPct < 0) {
    diffCard = '-' + Math.abs(diffPct);
  } else if (diffPct === 0.00) {
    diffCard = 'FLAT';
  } else {
    diffCard = '+' + diffPct;
  }

  const diffs = {}
  diffs.diff = diff;
  diffs.diffPct = diffPct;
  diffs.card = diffCard;
  diffs.speak = Math.abs(diffPct);
  diffs.show = Math.abs(diffPct);
  return diffs;
}

exports.pullData = function(closeCol, quoteName) {
  return new Promise(async(resolve, reject) => {
    const client = await pool.connect()
    try {
      const summary_res = await client.query(`SELECT * FROM index_summary where metric = '${closeCol}'`);
      await client.release();
      const summary = {};
      for (i=0;i<summary_res.rowCount;i++) {
        const key = summary_res.rows[i]['period'];
        summary[key] = summary_res.rows[i]
      }

      for (key of Object.keys(summary)) {
        summary[key]['diffs'] = getDiff(summary['today']['value'], summary[key]['value']);
        summary[key]['display'] = summary[key]['value'].toFixed(2);
      }

      const lastRound = Math.round(summary.today.value);
      let result = {};
      result.summary = summary;
      result.lastDate = summary.today.date;
      result.cardText = `Last Close: ${summary.today.display}\n1 Day:      ${summary.yesterday.display}   ${summary.yesterday.diffs.card}%\n30 Day:     ${summary.month.display}   ${summary.month.diffs.card}%\n365 Day:    ${summary.year.display}   ${summary.year.diffs.card}%\nMax Close:  ${summary.max.display}   ${summary.max.diffs.card}%\nMax Date:   ${summary.max.date}`;
      if (summary.yesterday.diffs.diffPct === 0.000) {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is roughly flat versus the previous <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme>`;
        resolve(result);
      } else if (summary.yesterday.diffs.diffPct < 0) {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is down ${summary.yesterday.diffs.speak} percent versus the previous <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme>`;
        resolve(result);
      } else {
        result.speechText = `The last <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme> for ${quoteName} was ${lastRound}. This is up ${summary.yesterday.diffs.speak} percent versus the previous <phoneme alphabet='ipa' ph='kloʊzz'>close</phoneme>`;
        resolve(result);
      }

    } catch(e) {
      reject(e);
    }
  });
}