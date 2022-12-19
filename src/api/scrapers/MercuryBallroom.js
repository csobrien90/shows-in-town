import { unEscapeWordPressHTML } from "../utilities.js";

export async function scrapeMercuryBallroom() {
	// Get eventData from Mercury Ballroom API
	const mercuryBallroomUrl = 'https://do502.com/venues/mercury-ballroom?format=json'
	const eventData = await fetch(mercuryBallroomUrl).then(res => res.json())

	// Iterate over elements and populate events array
	let events = [];
	for (let e of eventData.event_groups) {
		try {
			// Destructure event data
			const event = e.events[0]
			const { title, description, permalink, tz_adjusted_begin_date } = event

			// Define epoch and time
			const epoch = Date.parse(new Date(tz_adjusted_begin_date))
			const dateStringOptions = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute:'2-digit' }
			const time = new Date(epoch).toLocaleDateString('en-us', dateStringOptions)

			// Build description
			let desc = description ? description : ''
			if (!event.is_free) {
				if (!event.ticket_info) event.ticket_info = 'TBA'
				desc += ` --- Ticket cost: ${event.ticket_info}`
			} else {
				desc += ' --- FREE'
			}

			// Tidy up data and push to events array
			events.push({
				title,
				venue: 'Mercury Ballroom',
				address: '611 S 4th Street, Louisville, KY 40202',
				time,
				desc: unEscapeWordPressHTML(desc),
				link: `https://do502.com${permalink}`,
				epoch
			});
			
		} catch (e) {
			console.error(e)
		}
	}

	return events

}

// console.log(await scrapeMercuryBallroom())