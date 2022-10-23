import puppeteer from 'puppeteer';

export async function scrape() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({})
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://louisvillejazz.org/?post_type=tribe_events&posts_per_page=250')
	let eventsElements = await page.$$('.tribe-events-calendar-list__event-row')
	
	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventsElements) {
		// Extract data
		let [title, address, time, link] = await Promise.all([
			e.$eval('h3', el => el.innerText),
			e.$eval('address', el => el.innerText),
			e.$eval('.tribe-events-calendar-list__event-datetime', el => el.innerText),
			e.$eval('h3 a', el => el.href)
		]);

		// Handle description being only occasionally available
		let desc = await e.$('.tribe-events-calendar-list__event-description p');
		desc = desc ? await e.$eval('.tribe-events-calendar-list__event-description p', el => el.innerText) : '';

		// Tidy up data and push to events array
		events.push({
			title: title.trim(),
			address: address.replace(/\s+/g, ' '),
			time: time.trim(),
			desc,
			link
		});
	}

	// End puppeteer session and return events
	await page.close();
	await browser.close();

	return events;

}

console.log(await scrape())