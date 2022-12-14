import puppeteer from 'puppeteer';

export async function scrapeBlackJockeysLounge() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://www.blackjockeyslounge.com/upcoming-events')
	let eventsElements = await page.$$('._2Hij5:not(:last-of-type)')
	
	// Last item in events querySelectorAll is not an event
	eventsElements.pop();

	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventsElements) {
		try {
			// Extract data
			let [title, date, time] = await Promise.allSettled([
				e.$eval('p:nth-of-type(1)', el => el.innerText),
				e.$eval('p:nth-of-type(2)', el => el.innerText),
				e.$eval('p:nth-of-type(3)', el => el.innerText),
			]);

			// Confirm data is valid
			if (title.status === 'rejected' || date.status === 'rejected' || time.status === 'rejected') {
				continue
			} else {
				title = title.value
				date = date.value
				time = time.value
			}

			// make dateTime and description strings
			let desc = '';
			let doorsOpenIndex = time.indexOf('\n')
			if (doorsOpenIndex > 0) {
				desc = time;
				desc = time.slice(doorsOpenIndex).replace('\n', '')
				time = time.slice(0, doorsOpenIndex)
			}
			
			let dateTime = `${date.trim()}, ${time.trim()}`;
			
			// Generate epoch
			let dateArr = date.split(' ');
			let timeArr = time.replace(/\s+/g, '').split('-');

			let now = new Date();
			let currentMonth = now.getMonth();
			let currentDay = now.getDate();

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

			let month = monthLookup[dateArr[1]];
			let day = dateArr[2].slice(0, -2);

			let year;
			if (+month < currentMonth || ((+month === currentMonth) && (+day < currentDay))) {
				year = now.getFullYear() + 1;
			} else {
				year = now.getFullYear();
			}
		
			let startTime = timeArr[0];
			let isAM = startTime.substring(-2).includes('am');
			let hourNumber = startTime.split(':')[0]; 
			let hour = isAM ? hourNumber : +hourNumber + 12;
			let formattedHour = ('0' + hour).slice(-2);
			let minutes = startTime.split(':')[1].slice(0, -2);

			let parsableDate = `${year}-${month}-${day}T${formattedHour}:${minutes}:00`;
			let epoch = Date.parse(parsableDate);
			
			if (epoch < Date.parse(now) - 10800000) continue;

			// Tidy up data and push to events array
			events.push({
				title: title.replace(/\s+/g, ' ').trim(),
				venue: 'Black Jockey\'s Lounge',
				address: '630 S. 4th Street, Louisville, KY 40202',
				time: dateTime,
				epoch,
				desc,
				link: 'https://www.blackjockeyslounge.com/upcoming-events'
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

// console.log(await scrapeBlackJockeysLounge())