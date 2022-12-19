export async function scrapeIroqouisAmphitheater() {
	// Get eventData from do502 API
	const iroqouisAmphitheaterUrl = 'https://do502.com/venues/iroquois-amphitheater?format=json'
	const eventData = await fetch(iroqouisAmphitheaterUrl).then(res => res.json())

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
				venue: 'Iroqouis Amphitheater',
				address: '1080 Amphitheater Rd, Louisville, KY 40214',
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

// console.log(await scrapeIroqouisAmphitheater())