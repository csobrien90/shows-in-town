import puppeteer from 'puppeteer';

export async function scrapeLouisvilleJazzSociety() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://louisvillejazz.org/?post_type=tribe_events&posts_per_page=150')
	let eventsElements = await page.$$('.tribe-events-calendar-list__event-row')

	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventsElements) {
		try {
			// Extract data
			let [title, venue, address, time, link] = await Promise.all([
				e.$eval('h3', el => el.innerText),
				e.$eval('address .tribe-events-calendar-list__event-venue-title', el => el.innerText),
				e.$eval('address .tribe-events-calendar-list__event-venue-address', el => el.innerText),
				e.$eval('.tribe-events-calendar-list__event-datetime', el => el.innerText),
				e.$eval('h3 a', el => el.href)
			]);

			// Handle description being only occasionally available
			let desc = await e.$('.tribe-events-calendar-list__event-description p');
			desc = desc ? await e.$eval('.tribe-events-calendar-list__event-description p', el => el.innerText) : '';

			// Generate epoch
			let dateArr = time.trim().split(' ');
			let now = new Date();

			let monthLookup = {
				January: '01',
				February: '02',
				March: '03',
				April: '04',
				May: '05',
				June: '06',
				July: '07',
				August: '08',
				September: '09',
				October: '10',
				November: '11',
				December: '12'
			}

			let year = dateArr[2].includes('20') ? dateArr[2] : now.getFullYear();
			let month = monthLookup[dateArr[0]];
			let day = dateArr[1];
			let formattedDay = ('0' + day.replace(',', '')).slice(-2);
	
			let startTime = dateArr[dateArr.indexOf('–') - 2];
			let isAM = dateArr[dateArr.indexOf('–') - 1] === 'am';
			let timeArr = startTime.split(':');
			let hour = isAM ? timeArr[0] : +timeArr[0] + 12; 
			let formattedHour = ('0' + hour).slice(-2);

			let parsableDate = `${year}-${month}-${formattedDay}T${formattedHour}:${timeArr[1]}:00`;
			let epoch = Date.parse(parsableDate);
			
			if (epoch < Date.parse(now) - 10800000) continue;

			// Tidy up data and push to events array
			events.push({
				title: title.trim(),
				venue: venue.trim(),
				address: address.replace(/\s+/g, ' '),
				time: time.trim(),
				epoch,
				desc,
				link,
			});
			
		} catch (e) {
			console.error(e)
		}
	}

	// End puppeteer session and return events
	await page.close();
	await browser.close();

	return events;

}

// console.log(await scrapeLouisvilleJazzSociety())