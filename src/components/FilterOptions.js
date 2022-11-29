import React, {useState} from 'react';

const FilterOptions = ({ uniqueLocations, filterTimeline }) => {
	const [filterCategory, setFilterCategory] = useState(false)
	const [params, setParams] = useState({locations: []})

	const chooseCategory = (e) => {
		setFilterCategory(e.target.value)
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
		<form>
			<fieldset>
				<legend>Filter By</legend>
				<label htmlFor='location'>Venue</label>
				<input type='radio' id='location' name='filter-category' value='location' onClick={chooseCategory} />
			</fieldset>
			{filterCategory === 'location' && (
				<fieldset id='location-fields'>
					<legend>Location</legend>
					{uniqueLocations.map((location, index) => (
						<label key={index}>
							<input type='checkbox' name='location' value={location} onClick={(e) => handleClick('locations', e)}/>
							{location}
						</label>
					))}
				</fieldset>
			)}
		</form>
	)
}

export default FilterOptions;