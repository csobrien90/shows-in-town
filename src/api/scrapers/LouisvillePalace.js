import { unEscapeWordPressHTML, limitStringLength } from "../utilities.js";

export async function scrapeLouisvillePalace() {
	// Get eventData from do502 API
	const louisvillePalaceUrl = 'https://do502.com/venues/the-louisville-palace?format=json'
	const eventData = await fetch(louisvillePalaceUrl).then(res => res.json())

	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventData.event_groups) {
		try {
			// Destructure event data
			const event = e.events[0]
			const { title, description, permalink, tz_adjusted_begin_date, category } = event

			// Skip events that are not music
			let desc = description ? limitStringLength(unEscapeWordPressHTML(description), 750) : ''
			if (category !== 'Music' && !desc.toLowerCase().includes('music')) continue

			// Define epoch and time
			const epoch = Date.parse(new Date(tz_adjusted_begin_date))
			const dateStringOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit' }
			const time = new Date(epoch).toLocaleDateString('en-us', dateStringOptions)

			// Include ticket cost if not free
			if (!event.is_free) {
				if (!event.ticket_info) event.ticket_info = 'TBA'
				desc += ` --- Ticket cost: ${event.ticket_info}`
			} else {
				desc += ' --- FREE'
			}

			// Tidy up data and push to events array
			events.push({
				title,
				venue: 'Louisville Palace',
				address: '625 S 4th St, Louisville, KY 40202',
				time,
				desc,
				link: `https://do502.com${permalink}`,
				epoch
			});
			
		} catch (e) {
			console.error(e)
		}
	}

	return events

}

// console.log(await scrapeLouisvillePalace())