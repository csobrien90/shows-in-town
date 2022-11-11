import React from 'react';

const DayHeader = ({ epoch, isToday }) => {
	const formatDate = (epoch) => {
		const date = new Date(epoch)
		const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
		return date.toLocaleDateString('en-us', options)
	}

	return (
		<header className='dayHeader'>
			<div></div>
			<h2>{isToday ? 'TODAY' : formatDate(epoch)}</h2>
			<div></div>
		</header>
	)
}

export default DayHeader;