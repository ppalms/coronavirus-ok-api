import fetch from 'node-fetch';
import cheerio from 'cheerio';
import moment from 'moment';

export async function main() {
  const page = await fetch('https://coronavirus.health.ok.gov/');
  const $ = cheerio.load(await page.text());

  const table = $('table[summary="COVID-19 Oklahoma Test Results"]');
  const rows = table.children('tbody').children('tr');

  let testResults = rows.map((_, el) => {
    let testResult = $(el).text().trim("'").split(/[\r\n]+/);

    return {
      retrievedDate: moment().utc().format(),
      resultType: testResult[0],
      count: parseInt(testResult[1].replace(/,/g, ''))
    };
  });

  return testResults.get();
};
