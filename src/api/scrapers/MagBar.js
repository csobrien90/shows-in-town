import puppeteer from 'puppeteer';

export async function scrapeMagBar() {
	// Start and configure puppeteer
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	
	// Get page content
	await page.goto('https://magbarlouisville.com/')
	const dateElements = await page.$$('#shows h4')
	const eventElements = await page.$$('#shows strong a')

	// Combine dates and events
	const allEventData = []
	for (let i = 0; i < dateElements.length; i++) {
		allEventData.push({
			title: await eventElements[i].evaluate(node => node.innerText),
			details: await dateElements[i].evaluate(node => node.innerText),
			link: await eventElements[i].evaluate(node => node.href)
		})
	}

	// Iterate over elements and populate events array
	let events = [];
	for (let e of allEventData) {
		try {
			// Extract data and skip if no title, details, or link
			const {title, details, link} = e
			if (title.length === 0 || details.length === 0 || link.length === 0) continue

			// Put ticket cost in description
			const splitDetails = details.split('-')
			const desc = `Ticket cost: ${splitDetails[1].trim()}`

			// Convert string into parsable date
			const dateArr = splitDetails[0].replace('AT ', '').trim().split(' ')
			if (dateArr[dateArr.length-2].length < 3) dateArr[dateArr.length-2] += ':00'

			// Define epoch and time
			const epoch = Date.parse(dateArr.join(' '))
			const dateStringOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit' }
			const time = new Date(epoch).toLocaleDateString('en-us', dateStringOptions)

			// Tidy up data and push to events array
			events.push({
				title,
				venue: 'Mag Bar',
				address: '1398 S 2nd St Louisville, KY 40208',
				time,
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

// console.log(await scrapeMagBar())