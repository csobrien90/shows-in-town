import React, { useState, useEffect } from 'react';
import DayHeader from './DayHeader';
import Event from './Event';
import stringSimilarity from 'string-similarity';

const Timeline = ({ setIsLoading }) => {
	const [data, setData] = useState(null)
	const [uniqueLocations, setUniqueLocations] = useState(null)

	useEffect(() => {
		fetch('http://localhost:500')
			.then(res => res.json())
			.then(res => {
				// Set fetched data and falsify loading status
				res.sort((a, b) => {return a.epoch-b.epoch});
				setData(res)
				setIsLoading(false)

				// Get all unique locations
				const allLocations = [...new Set(res.map(event => event.address))];
				
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
			{data && data.map((event, index) => {
				// Skip event if it is in the past
				if (isPastEvent(event.epoch)) return false

				// If event is first of its date, render date header
				if (index === 0 || isNewDay(event.epoch, data[index-1].epoch)) {
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
			{data && <p className='noMoreEvents'>-no more events to show - check back later-</p>}
		</>
	)
}

export default Timeline;