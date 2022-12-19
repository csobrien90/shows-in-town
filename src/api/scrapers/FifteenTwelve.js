import puppeteer from "puppeteer";

export async function scrapeFifteenTwelve() {
	// Define initial request details
	const baseUrl = 'https://www.fifteen-twelve.com/api/open/'
	const route = 'GetItemsByMonth'
	const collectionId = '609031f30fb7f43fc4ac76a2'

	// Create query params for this month and the next two months
	const now = new Date()
	const nextMonthDateTime = new Date(now.getFullYear(), now.getMonth()+1, 1)
	const twoMonthsFromNowDateTime = new Date(nextMonthDateTime.getFullYear(), nextMonthDateTime.getMonth()+1, 1)
	
	let thisMonthParam = `${now.getMonth() + 1}-${now.getFullYear()}`
	let nextMonthParam = `${nextMonthDateTime.getMonth() + 1}-${nextMonthDateTime.getFullYear()}`
	let twoMonthsFromNowParam = `${twoMonthsFromNowDateTime.getMonth() + 1}-${twoMonthsFromNowDateTime.getFullYear()}`
	
	// Get events for those months and compile into rawEvents
	const [thisMonth, nextMonth, twoMonthsFromNow] = await Promise.all([
		fetch(`${baseUrl}${route}?collectionId=${collectionId}&month=${thisMonthParam}`).then(res => res.json()),
		fetch(`${baseUrl}${route}?collectionId=${collectionId}&month=${nextMonthParam}`).then(res => res.json()),
		fetch(`${baseUrl}${route}?collectionId=${collectionId}&month=${twoMonthsFromNowParam}`).then(res => res.json()),
	])

	const rawEvents = [
		...thisMonth,
		...nextMonth,
		...twoMonthsFromNow
	]
	
	// Iterate over elements and populate events array
	let events = [];
	for (let e of rawEvents) {
		try {
			const epoch = e.startDate
			if (epoch < Date.parse(now) - 10800000) continue

			// Use puppeteer to get description from single event page
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto('https://www.fifteen-twelve.com' + e.fullUrl)
			const content = await page.evaluate(() => document.querySelector('.eventitem-column-content').innerText)
			const desc = content.split('\n').filter(n => n).join(' - ')
			await browser.close();

			// Tidy up data and push to events array
			events.push({
				title: e.title,
				venue: 'fifteenTWELVE',
				address: `1512 Portland Avenue, Louisville KY, 40203`,
				time: `${new Date(e.startDate).toLocaleTimeString()} - ${new Date(e.endDate).toLocaleTimeString()}`,
				desc,
				link: 'https://www.fifteen-twelve.com' + e.fullUrl,
				epoch
			});
			
		} catch (e) {
			console.error(e)
		}
	}

	return events

}

// console.log(await scrapeFifteenTwelve())