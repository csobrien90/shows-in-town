import React from 'react';

const DayHeader = ({ epoch }) => {
	const now = new Date()
	const thisEventDate = new Date(epoch)
	const headerId = new Date(epoch).setHours(0,0,0,0)
	
	const formatDate = () => {
		const options = { weekday: 'long', month: 'long', day: 'numeric' }
		
		// Only display the year if not this year
		if (thisEventDate.getFullYear() !== now.getFullYear())  options.year = 'numeric'
		
		return thisEventDate.toLocaleDateString('en-us', options)
	}

	const isToday = () => {
		return now.getFullYear() === thisEventDate.getFullYear() 
		&& now.getMonth() === thisEventDate.getMonth() 
		&& now.getDate() === thisEventDate.getDate()
	}
	
	return (
		<header className='dayHeader' id={headerId}>
			<div></div>
			<h2>{isToday() ? 'Today' : formatDate()}</h2>
			<div></div>
		</header>
	)
}

export default DayHeader;