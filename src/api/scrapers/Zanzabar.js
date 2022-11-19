import axios from "axios"
import {unEscapeWordPressHTML} from '../utilities.js'

export async function scrapeZanzabar() {
	// Get events from exposed WordPress REST API endpoint
	const response = await axios.get('https://www.zanzabarlouisville.com/wp-json/tribe/events/v1/events')
	const rawEvents = response.data

	// Iterate over elements and populate events array
	let events = [];
	rawEvents.events.forEach(event => {
		try {
			const {title, description, url, start_date, end_date, cost} = event
	
			// Prepare times
			const epoch = Date.parse(start_date)
			const startTime = new Date(start_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
			const endTime = new Date(end_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
	
			// Tidy up data and push to events array
			events.push({
				title: unEscapeWordPressHTML(title),
				address: 'Zanzabar - 2100 S Preston St, Louisville, KY 40217',
				time: `${startTime} - ${endTime}`,
				desc: unEscapeWordPressHTML(description) + ` --- Ticket cost: ${cost}`,
				link: url,
				epoch
			});
		} catch (e) {
			console.error(e)
		}
	})

	return events

}

// console.log(await scrapeZanzabar())