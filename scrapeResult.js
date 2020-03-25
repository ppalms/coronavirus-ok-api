import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function main() {
  const page = await fetch('https://coronavirus.health.ok.gov/');
  const $ = cheerio.load(await page.text());
  const table = $('table[summary="COVID-19 Oklahoma Test Results"]');
  const rows = table.children('tbody').children('tr');
  const now = new Date().toISOString();

  let testResults = rows.map((_, el) => {
    let testResult = $(el).text().trim("'").split(/[\r\n]+/);

    return {
      resultId: testResult[0].concat(now),
      resultType: testResult[0],
      count: testResult[1],
      retrievedDate: now
    };
  });

  return testResults.get();
};
