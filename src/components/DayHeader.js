import React from 'react';

const DayHeader = ({ epoch }) => {
	const now = new Date()
	
	const formatDate = (epoch) => {
		const thisEventDate = new Date(epoch)
		const options = { weekday: 'long', month: 'long', day: 'numeric' }
		
		// Only display the year if not this year
		if (thisEventDate.getFullYear() !== now.getFullYear())  options.year = 'numeric'
		
		return thisEventDate.toLocaleDateString('en-us', options)
	}

	const isToday = (epoch) => {
		const thisEventDate = new Date(epoch)

		return now.getFullYear() === thisEventDate.getFullYear() 
		&& now.getMonth() === thisEventDate.getMonth() 
		&& now.getDate() === thisEventDate.getDate()
	}
	
	return (
		<header className='dayHeader'>
			<div></div>
			<h2>{isToday(epoch) ? 'TODAY' : formatDate(epoch)}</h2>
			<div></div>
		</header>
	)
}

export default DayHeader;