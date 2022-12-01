import axios from "axios";

export async function scrapeStevieRays() {
	// Define initial request details
	const baseUrl = 'https://www.stevieraysbluesbar.com/api/open/'
	const route = 'GetItemsByMonth'
	const collectionId = '524eeefbe4b05e9b207a6bea'

	// Create query params for this month and the next two months
	const now = new Date()
	const nextMonthDateTime = new Date(now.getFullYear(), now.getMonth()+1, 1)
	const twoMonthsFromNowDateTime = new Date(nextMonthDateTime.getFullYear(), nextMonthDateTime.getMonth()+1, 1)
	
	let thisMonthParam = `${now.getMonth() + 1}-${now.getFullYear()}`
	let nextMonthParam = `${nextMonthDateTime.getMonth() + 1}-${nextMonthDateTime.getFullYear()}`
	let twoMonthsFromNowParam = `${twoMonthsFromNowDateTime.getMonth() + 1}-${twoMonthsFromNowDateTime.getFullYear()}`
	
	// Get events for those months and compile into rawEvents
	const [thisMonth, nextMonth, twoMonthsFromNow] = await Promise.all([
		axios.get(`${baseUrl}${route}?collectionId=${collectionId}&month=${thisMonthParam}`),
		axios.get(`${baseUrl}${route}?collectionId=${collectionId}&month=${nextMonthParam}`),
		axios.get(`${baseUrl}${route}?collectionId=${collectionId}&month=${twoMonthsFromNowParam}`),
	])

	const rawEvents = [
		...thisMonth.data,
		...nextMonth.data,
		...twoMonthsFromNow.data
	]
	
	// Iterate over elements and populate events array
	let events = [];
	for (let e of rawEvents) {
		try {
			const epoch = e.startDate
			if (epoch < Date.parse(now) - 10800000) continue

			const title = e.title
			if (title.includes('AVAILABLE FOR SPECIAL EVENTS')) continue
			
			let firstTitle = title.split('(').shift().trim()
			let secondaryTitle = null
			if (title.includes('-----')) secondaryTitle = title.split('-----')[1].split('(')[0].trim()
			let shortenedTitle = secondaryTitle ?  `${firstTitle} and ${secondaryTitle}` : firstTitle

			// Tidy up data and push to events array
			events.push({
				title: shortenedTitle,
				venue: e.location.addressTitle,
				address: `${e.location.addressLine1} ${e.location.addressLine2}`,
				time: `${new Date(e.startDate).toLocaleTimeString()} - ${new Date(e.endDate).toLocaleTimeString()}`,
				desc: title,
				link: 'https://www.stevieraysbluesbar.com' + e.fullUrl,
				epoch
			});
			
		} catch (e) {
			console.error(e)
		}
	}

	return events

}

// console.log(await scrapeStevieRays())