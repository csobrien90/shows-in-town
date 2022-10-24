import React from 'react';

const Event = ({ data }) => {
	console.log(data.epoch)
	return (
		<article>
			<a href={data.link}>
				<h3>{data.title}</h3>
			</a>
			<p>{data.address}</p>
			<p>{data.time}</p>
			<p>{data.desc}</p>
		</article>
	)
}

export default Event;