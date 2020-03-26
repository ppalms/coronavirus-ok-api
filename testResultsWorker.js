import * as scraper from './scrapeResults';
import * as persist from './persistResult';

export async function main() {
  const results = await scraper.main();

  for (const result of results) {
    const event = { body: JSON.stringify(result) };
    persist.main(event);
  }
}
