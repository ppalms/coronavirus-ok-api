import fetch from 'node-fetch';
import cheerio from 'cheerio';
import moment from 'moment';

export async function main() {
  const page = await fetch('https://coronavirus.health.ok.gov/');
  const $ = cheerio.load(await page.text());
  const table = $('table[summary="COVID-19 Cases by County"]');
  const rows = table.children('tbody').children('tr');

  let testResults = rows.map((_, el) => {
    let testResult = $(el).text().trim().split(/[\r\n]+/);

    return {
      county: testResult[0],
      cases: parseInt(testResult[1]),
      deaths: parseInt(testResult[2]),
      retrievedDate: moment().utc().format()
    };
  });

  return testResults.get();
};
