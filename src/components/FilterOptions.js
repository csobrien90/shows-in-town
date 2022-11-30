import React, {useState} from 'react';

const FilterOptions = ({ uniqueLocations, filterTimeline, isVisible }) => {
	const [filterCategory, setFilterCategory] = useState(false)
	const [params, setParams] = useState({locations: []})

	const chooseCategory = (e) => {
		if (e.target.checked) {
			setFilterCategory(e.target.value)
		} else {
			setFilterCategory(false)
			clearCategory(e.target.value)
		}
	}

	const clearCategory = (category) => {
		const newParams = {...params, [category]: []}
		setParams(newParams)
		filterTimeline(newParams)
		document.querySelectorAll(`#${category}-fields input`).forEach(input => input.checked = false)
	}

	const handleClick = (category, e) => {
		const newParams = {...params}

		if (e.target.checked && !newParams[category].includes(e.target.value)) {
			// Add checked item to params
			newParams[category].push(e.target.value)
		} else {
			// Remove unchecked item from params
			newParams[category] = newParams[category].filter(item => item !== e.target.value)
		}

		setParams(newParams)
		filterTimeline(newParams)
	}

	return (
		<form style={{display: isVisible ? 'grid' : 'none'}} id='filters'>
			<fieldset id='filter-by'>
				<legend>Filter By</legend>
				<label htmlFor='locations'>
					Venue
					<input type='checkbox' id='locations' name='filter-category' value='locations' onClick={chooseCategory} />
				</label>
			</fieldset>
			{filterCategory === 'locations' && (
				<fieldset id='locations-fields'>
					<legend>Location</legend>
					<label htmlFor='clear-all-locations'>
						<input type='checkbox' id='clear-all-locations' value='clear-all-locations' onClick={(e) => clearCategory('locations')}/>
						Clear all location filters (see all locations)
					</label>
					{uniqueLocations.map((location, index) => (
						<label key={index} htmlFor={'location'+index}>
							<input type='checkbox' id={'location'+index} value={location} onClick={(e) => handleClick('locations', e)}/>
							{location}
						</label>
					))}
				</fieldset>
			)}
		</form>
	)
}

export default FilterOptions;