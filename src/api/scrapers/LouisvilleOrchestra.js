import axios from "axios"
import {unEscapeWordPressHTML} from '../utilities.js'

export async function scrapeLouisvilleOrchestra() {
	// Get events from exposed WordPress REST API endpoint
	const response = await axios.get('https://louisvilleorchestra.org/wp-json/tribe/events/v1/events')
	const rawEvents = response.data.events

	// Iterate over elements and populate events array
	let events = [];
	rawEvents.forEach(event => {
		try {
			const {title, description, url, start_date, venue} = event
	
			// Prepare times
			const epoch = Date.parse(start_date)
			const dateStringOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true}
			const startTime = new Date(start_date).toLocaleDateString('en-US', dateStringOptions)

			// Prepare venue
			const address = `${venue.address}, ${venue.city}, ${venue.state ? venue.state : 'KY'} ${venue.zip}`
	
			// Tidy up data and push to events array
			events.push({
				title: unEscapeWordPressHTML(title),
				venue: unEscapeWordPressHTML(venue.venue),
				address: unEscapeWordPressHTML(address),
				time: startTime,
				desc: unEscapeWordPressHTML(description),
				link: url,
				epoch
			});
		} catch (e) {
			console.error(e)
		}
	})

	return events

}

// console.log(await scrapeLouisvilleOrchestra())