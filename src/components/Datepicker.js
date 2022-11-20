const Datepicker = () => {

	const jumpToDate = (e) => {
		const selectedEpoch = String(new Date(e.target.value).setHours(24,0,0,0))
		
		// Get sorted array of all day header ids
		const headerIds = [...document.querySelectorAll('.dayHeader')]
			.map(header => header.id)
			.sort((a,b) => a - b)

		// Scroll to selected or nearest date 
		if (headerIds.includes(selectedEpoch)) {
			document.getElementById(selectedEpoch).scrollIntoView()
		} else {
			headerIds.forEach(id => {
				if (+selectedEpoch < +id) {
					document.getElementsByTagName('h1')[0].scrollIntoView()
				} else {
					document.getElementById(id).scrollIntoView()	
				}
			})
		}

	}

	return (<input type='date' onChange={jumpToDate} />)
}

export default Datepicker;