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

	useEffect(() => {
		const recordEvent = (e) => {
			const event = {
				type: e.type,
				time: Date.now() - timeOfPageLoad
			}
	
			if (e.type === 'click') {
				event.target = {
					tagName: e.target.tagName,
					innerText: e.target.innerText,
					id: e.target.id,
					classList: [...e.target.classList]
				}
			} else if (e.type === 'scroll') {
				event.scrollX = window.scrollX
				event.scrollY = window.scrollY
			}
	
			setEvents(prevEvents => {
				return [...prevEvents, event]
			})
		}

		['click', 'scroll'].forEach(eventType => {
			window.addEventListener(eventType, (e) => {
				recordEvent(e)
			})
		})
	}, [])

	// Add event listener to send data when user leaves the page
	useEffect(() => {
		// Prepare user data object to send to db
		const makeUserDataObject = () => {
			// Calculate time on page
			const timeOnPage = Date.now() - timeOfPageLoad
	
			// Return user data object
			return {
				userAgent,
				timeOnPage,
				ipData,
				events
			}
		}

		// Send data to db when user leaves the page
		const sendData = () => {
			// Make user data object
			const userData = makeUserDataObject()
	
			// Send data to db
			fetch('https://z32mbfotsov62vonmya6xsnyz40lydhm.lambda-url.us-east-2.on.aws/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData),
				keepalive: true
			})
		}

		window.addEventListener('beforeunload', sendData)

		return () => {
			window.removeEventListener('beforeunload', sendData)
		}
	}, [ipData, events])

	return (
		<>
			{children instanceof Array ? {...children} : children}
		</>
	)
}

export default DataCollector;