import puppeteer from 'puppeteer';

export async function scrape() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({})
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://headlinerslouisville.com/events/?view=list')
	let eventsElements = await page.$$('.rhpSingleEvent')
	
	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventsElements) {
		// Extract data
		let [title, date, time, link] = await Promise.all([
			e.$eval('h2', el => el.innerText),
			e.$eval('#eventDate', el => el.innerText),
			e.$eval('.eventDoorStartDate', el => el.innerText),
			e.$eval('#eventTitle', el => el.href)
		]);

		// Handle description and date/time concatenation
		let ages = await e.$('.eventAgeRestriction');
		ages = ages ? await e.$eval('.eventAgeRestriction', el => el.innerText) : '';
		let ticketCost = await e.$('.fa-ticket');
		ticketCost = ticketCost ? await e.$eval('.fa-ticket', el => el.innerText) : '';

		let desc = `${ages.trim()}|${ticketCost.trim()}`;
		let dateTime = `${date.trim()}|${time.trim()}`;

		if (date && time) {
			dateTime = dateTime.replace('|', ' - ')
		} else {
			dateTime = dateTime.replace('|', '')
		}

		if (ages && ticketCost) {
			desc = desc.replace('|', ' - ')
		} else {
			desc = desc.replace('|', '')
		}
		
		// Tidy up data and push to events array
		events.push({
			title: title.trim(),
			address: 'Headliners Music Hall - 1386 Lexington Rd. Louisville, KY',
			time: dateTime,
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