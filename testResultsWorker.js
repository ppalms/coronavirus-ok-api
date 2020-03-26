import * as scraper from './scrapeResults';
import * as resultsByDate from './listResultsByDate';
import * as persist from './persistResult';
import moment from 'moment';

export async function main() {
  const today = moment().format('L'); // 03/26/2020
  const result = await resultsByDate.main({ pathParameters: JSON.stringify(today) });
  const existing = JSON.parse(result.body);

  if (existing.length > 0) {
    console.log(`Already found results for ${today}`);
    return;
  }

  const results = await scraper.main();

  for (const result of results) {
    const event = { body: JSON.stringify(result) };
    persist.main(event);
  }
}
