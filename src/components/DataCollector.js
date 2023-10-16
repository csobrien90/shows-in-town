import { useEffect, useState } from "react"

const DataCollector = ({children}) => {
	// Get the time of page load as a timestamp
	const timeOfPageLoad = Date.now()

	// Get the user agent
	const userAgent = navigator.userAgent

	// Get the user's IP address and location from the ipdata API
	const [ipData, setIpData] = useState(null)
	useEffect(() => {
		const fetchIpData = async () => {
			const apiKey = 'c0ed918b293a8b219647d2f7f0740aa10629b0628bc44f389d5dcaab'
			const response = await fetch(`https://api.ipdata.co?api-key=${apiKey}`)
			const json = await response.json()
			setIpData(json)
		}

		fetchIpData()
	}, [])

	// Record all user interactions with the page
	const [events, setEvents] = useState([])

	const recordEvent = (e) => {
		const event = {
			type: e.type,
			target: e.target,
			time: Date.now() - timeOfPageLoad
		}

		setEvents(prevEvents => {
			return [...prevEvents, event]
		})
	}
	
	useEffect(() => {
		['click', 'scroll'].forEach(eventType => {
			window.addEventListener(eventType, (e) => {
				recordEvent(e)
			})
		})
	}, [])


	// When the user leaves the page, send data to the db
	window.addEventListener('beforeunload', async (e) => {
		// Calculate time on page
		const timeOnPage = Date.now() - timeOfPageLoad

		// Prep user data object to send to db
		const userData = {
			userAgent,
			timeOnPage,
			ipData,
			events
		}

		// Send data to db
		const response = await fetch('https://z32mbfotsov62vonmya6xsnyz40lydhm.lambda-url.us-east-2.on.aws/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		}).catch(err => console.log(err))

		// Log response from db
		const json = await response.json()
		console.log(json)
	})

	return (
		<>
			{children instanceof Array ? {...children} : children}
		</>
	)
}

export default DataCollector;