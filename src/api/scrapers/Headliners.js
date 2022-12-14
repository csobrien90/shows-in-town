import puppeteer from 'puppeteer';

export async function scrapeHeadliners() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://headlinerslouisville.com/events/?view=list')
	let eventsElements = await page.$$('.rhpSingleEvent')
	
	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventsElements) {
		try {
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

			// Generate epoch
			let dateArr = date.split(' ');
			let timeArr = time.split(' ');

			let now = new Date();
			let currentMonth = now.getMonth();
			let currentDay = now.getDate();

			let monthLookup = {
				JAN: '01',
				FEB: '02',
				MAR: '03',
				APR: '04',
				MAY: '05',
				JUN: '06',
				JUL: '07',
				AUG: '08',
				SEP: '09',
				OCT: '10',
				NOV: '11',
				DEC: '12'
			}
			
		
			let month = monthLookup[dateArr[1]];
			let day = dateArr[2];

			let year;
			if (+month < currentMonth || ((+month === currentMonth) && (+day < currentDay))) {
				year = now.getFullYear() + 1;
			} else {
				year = now.getFullYear();
			}
		
			let startTime = timeArr[2];
			let isAM = timeArr[2].includes('am');
			let hourNumber = timeArr[2].substring(0, timeArr[2].length - 2).split(':')[0]; 
			let hour = isAM ? hourNumber : +hourNumber + 12;
			let formattedHour = ('0' + hour).slice(-2);
			let minutes = startTime.includes(':') ? startTime.slice(startTime.indexOf(':'), startTime.indexOf(':') + 2) : '00';

			let parsableDate = `${year}-${month}-${day}T${formattedHour}:${minutes}:00`;
			let epoch = Date.parse(parsableDate);

			if (epoch < Date.parse(now) - 10800000) continue;

			// Tidy up data and push to events array
			events.push({
				title: title.trim(),
				venue: 'Headliners Music Hall',
				address: '1386 Lexington Rd. Louisville, KY',
				time: dateTime,
				epoch,
				desc,
				link
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

// console.log(await scrapeHeadliners())