import React, { useState } from 'react';
import Timeline from './components/Timeline';

const App = () => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<main>
			<header>
				<h1>Shows In Town</h1>
				<hr />
				<p className='subtitle'>live music in Louisville</p>
			</header>
			<Timeline setIsLoading={setIsLoading} />
			{!isLoading && <p className='noMoreEvents'>-no more events to show - check back later-</p>}
			<a href="#top" id='topLink'>Top ↑</a>
		</main>
	)
}

export default App;