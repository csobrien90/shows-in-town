import React, { useState } from 'react';
import Datepicker from './components/Datepicker';
import Timeline from './components/Timeline';

const App = () => {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<main className={isLoading ? 'loading' : ''}>
			<header>
				<h1>Shows In Town</h1>
				<hr />
				{isLoading && <p className='subtitle'>Finding live music in Louisville...</p>}
				{!isLoading && (
					<div className='subheading'>
						<p className='subtitle'>live music in Louisville</p>
						<Datepicker />
					</div>
				)}
			</header>
			<Timeline setIsLoading={setIsLoading} />
			{!isLoading && <a href="#top" id='topLink'>Top ↑</a>}
		</main>
	)
}

export default App;