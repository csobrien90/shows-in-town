import React, { useEffect } from 'react';
import DayHeader from './DayHeader';
import Event from './Event';
import stringSimilarity from 'string-similarity';

const Timeline = ({ setIsLoading, setEvents, events, setUniqueLocations}) => {

	useEffect(() => {
		fetch('https://shows-in-town.xyz')
			.then(res => res.json())
			.then(res => {
				// Set fetched data and falsify loading status
				res.sort((a, b) => {return a.epoch-b.epoch});
				setEvents(res)
				setIsLoading(false)

				// Get all unique locations
				const allLocations = [...new Set(res.map(event => event.venue))];
				
				// only include one location of groups with 90% similar name
				const uniqueLocations = allLocations.filter((location, index) => {
					const similarLocations = allLocations.filter((location2, index2) => {
						if (index2 > index) {
							return stringSimilarity.compareTwoStrings(location, location2) > 0.9
						} else {
							return false
						}
					})
					return similarLocations.length === 0
				})

				// Sort unique locations alphabetically ingoring case and leading articles
				uniqueLocations.sort((a, b) => {
					const aNoArticle = a.replace(/^(a |the |an )/i, '')
					const bNoArticle = b.replace(/^(a |the |an )/i, '')
					return aNoArticle.localeCompare(bNoArticle)
				})
				
				setUniqueLocations(uniqueLocations)
			})
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const isNewDay = (epoch, prevEpoch) => {
		// Return true if epoch is not the same day as prevEpoch
		const prevEventDate = new Date(prevEpoch)
		const thisEventDate = new Date(epoch)
		
		return prevEventDate.getFullYear() !== thisEventDate.getFullYear() 
			|| prevEventDate.getMonth() !== thisEventDate.getMonth() 
			|| prevEventDate.getDate() !== thisEventDate.getDate()
	}

	const isPastEvent = (epoch) => {
		const today = new Date(new Date().setHours(0,0,0,0))
		return epoch < today
	}

	return (
		<>
			{events && events.map((event, index) => {
				// Skip event if it is in the past
				if (isPastEvent(event.epoch)) return false

				// If event is first of its date, render date header
				if (index === 0 || isNewDay(event.epoch, events[index-1].epoch)) {
					return (
						<React.Fragment key={index}>
							<DayHeader epoch={event.epoch} />
							<Event data={event} />
						</React.Fragment>
					)
				} else {
					return (
						<Event data={event} key={index} />
					)
				}
			})}
			{events && <p className='noMoreEvents'>-no more events to show - check back later-</p>}
		</>
	)
}

export default Timeline;