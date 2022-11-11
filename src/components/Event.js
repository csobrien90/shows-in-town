import React from 'react';

const Event = ({ data }) => {
	return (
		<article>
			<a href={data.link} target="_blank" rel="noopener noreferrer">
				<h3>{data.title}</h3>
			</a>
			<p className='event-address'>{data.address}</p>
			<p className='event-time'>{data.time}</p>
			<p className='event-description'>{data.desc}</p>
		</article>
	)
}

export default Event;