import React, { useState } from 'react';
import Datepicker from './components/Datepicker';
import Timeline from './components/Timeline';
import Filter from './components/Filter';
import FilterOptions from './components/FilterOptions';
import stringSimilarity from 'string-similarity';

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [events, setEvents] = useState(null)
	const [filteredEvents, setFilteredEvents] = useState(null)
	const [expandedSection, setExpandedSection] = useState(null)
	const [uniqueLocations, setUniqueLocations] = useState(null)

	const filterTimeline = (params) => {
		let eventsArr = [...events]
		
		// Filter events by location
		if (params.locations.length > 0) {
			eventsArr = eventsArr.filter(event => {
				return params.locations.includes(event.address) ||
					params.locations.some(location => {
						return stringSimilarity.compareTwoStrings(location, event.address) > 0.9
					})
			})
		}

		setFilteredEvents(eventsArr)
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
							<Filter expandedSection={expandedSection} setExpandedSection={setExpandedSection} />
							<Datepicker />
						</div>
					</div>
				)}
			</header>
			<section id='expanded-section'>
				<FilterOptions uniqueLocations={uniqueLocations} filterTimeline={filterTimeline} isVisible={expandedSection === 'filter-options'}/>
			</section>
			<Timeline setIsLoading={setIsLoading} setEvents={setEvents} events={filteredEvents || events} setUniqueLocations={setUniqueLocations} />
			{!isLoading && <a href="#top" id='topLink'>Top ↑</a>}
		</main>
	)
}

export default App;