import React, { useState, useEffect } from 'react';
import DayHeader from './DayHeader';
import Event from './Event';

const Timeline = () => {
	const [data, setData] = useState(null)

	useEffect(() => {
		fetch('http://localhost:500')
			.then(res => res.json())
			.then(res => {
				res.sort((a, b) => {return a.epoch-b.epoch});
				setData(res)
			})
	}, [])

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
		</>
	)
}

export default Timeline;