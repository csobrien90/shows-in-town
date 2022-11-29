import React, { useState } from 'react';
import Datepicker from './components/Datepicker';
import Timeline from './components/Timeline';
import Filter from './components/Filter';

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [events, setEvents] = useState(null)

	const filterTimeline = (params) => {
		let eventsArr = [...events]

		// Filter events by location
		if (params.locations) {
			eventsArr = eventsArr.filter(event => params.locations.includes(event.address))
		}

		setEvents(eventsArr)
	}

	return (
		<main className={isLoading ? 'loading' : ''}>
			<header>
				<h1>Shows In Town</h1>
				<hr />
				{isLoading && <p className='subtitle'>Finding live music in Louisville...</p>}
				{!isLoading && (
					<div className='subheading'>
						<p className='subtitle'>live music in Louisville</p>
						<div className='options-wrapper'>
							<Filter filterTimeline={filterTimeline} />
							<Datepicker />
						</div>
					</div>
				)}
			</header>
			<Timeline setIsLoading={setIsLoading} setEvents={setEvents} events={events} />
			{!isLoading && <a href="#top" id='topLink'>Top ↑</a>}
		</main>
	)
}

export default App;