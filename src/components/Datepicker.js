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
			if (+selectedEpoch < headerIds[0]) document.getElementsByTagName('h1')[0].scrollIntoView()

			for (let i = 0; i < headerIds.length; i++) {
				if (selectedEpoch > headerIds[i] && selectedEpoch < headerIds[i+1]){
					document.getElementById(headerIds[i+1]).scrollIntoView()
				}
			}
		}

	}

	return (<input type='date' onChange={jumpToDate} aria-label='Jump to date' title='Jump to date'/>)
}

export default Datepicker;