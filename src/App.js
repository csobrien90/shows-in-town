import React from 'react';
import Timeline from './components/Timeline';

const App = () => {
	return (
		<main>
			<header>
				<h1>Shows In Town</h1>
				<hr />
				<p className='subtitle'>live music in Louisville</p>
			</header>
			<Timeline />
		</main>
	)
}

export default App;