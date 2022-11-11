import axios from "axios";

export async function scrapeZanzabar() {
	// Get events from exposed WordPress REST API endpoint
	const response = await axios.get('https://www.zanzabarlouisville.com/wp-json/tribe/events/v1/events')
	const rawEvents = response.data
	
	return rawEvents

	// Iterate over elements and populate events array
	let events = [];
	for (let e of rawEvents) {
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
			address: `${e.location.addressTitle} - ${e.location.addressLine1} ${e.location.addressLine2}`,
			time: `${new Date(e.startDate).toLocaleTimeString()} - ${new Date(e.endDate).toLocaleTimeString()}`,
			desc: title,
			link: 'https://www.Zanzabarbluesbar.com' + e.fullUrl,
			epoch
		});
	}

	return events

}

console.log(await scrapeZanzabar())