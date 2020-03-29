import * as scraper from './scrapeCasesByCounty';
import * as persist from './persistCasesByCounty';
import moment from 'moment';

export async function main() {
  const results = await scraper.main();
  console.log(`Found ${results.length} new results for ${moment().format()}`);

  for (const result of results) {
    const event = { body: JSON.stringify(result) };
    await persist.main(event);
  }
}
