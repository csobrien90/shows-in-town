import React from 'react';

const Event = ({ data }) => {
	return (
		<article>
			<a href={data.link} target="_blank" rel="noopener noreferrer">
				<h3>{data.title}</h3>
			</a>
			<p>{data.address}</p>
			<p>{data.time}</p>
			<p>{data.desc}</p>
		</article>
	)
}

export default Event;