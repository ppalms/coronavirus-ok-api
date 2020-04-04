import fetch from 'node-fetch';
import cheerio from 'cheerio';
import uuid from 'uuid';
import moment from 'moment';

export async function main() {
  const page = await fetch('https://coronavirus.health.ok.gov/');
  const $ = cheerio.load(await page.text());

  const table = $('table[summary="COVID-19 Oklahoma Test Results"]');
  const rows = table.children('tbody').children('tr');

  let testResults = rows.map((_, el) => {
    let testResult = $(el).text().trim("'").split(/[\r\n]+/);

    return {
      resultId: uuid.v4(),
      resultType: testResult[0],
      count: testResult[1],
      retrievedDate: moment().utc().format()
    };
  });

  return testResults.get();
};
