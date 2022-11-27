import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import Datepicker from '../components/Datepicker'

describe("<Datepicker />", () => {
	const wrapper = shallow(<Datepicker />)

	it("renders without crashing", () => {
		expect(wrapper).toBeTruthy()
	})

	it("renders a date input", () => {
		expect(wrapper.find("input[type='date']")).toHaveLength(1)
	})

	it("calls jumpToDate when date input changes", () => {
		// Spy on sort and map array methods
		const sortSpy = jest.spyOn(Array.prototype, 'sort')
		const mapSpy = jest.spyOn(Array.prototype, 'map')
		
		// Spy on document.querySelectorAll and mock return value
		const querySelectorAllSpy = jest.spyOn(document, 'querySelectorAll')
		querySelectorAllSpy.mockImplementation(() => ([{id: '1735707600000'}, {id: '1935794000000'}]))
		
		// Spy on document.getElementById and getElementsByTagname
		const getElementByIdSpy = jest.spyOn(document, 'getElementById')
		const getElementsByTagNameSpy = jest.spyOn(document, 'getElementsByTagName')

		// Mock scrollIntoView method
		getElementByIdSpy.mockImplementation(() => ({scrollIntoView: () => {}}))
		getElementsByTagNameSpy.mockImplementation(() => ([{scrollIntoView: () => {}}]))

		// Simulate a date input change
		wrapper.find("input[type='date']").simulate("change", { target: { value: "2025-01-01" } })

		// Check that jumpToDate queried the DOM for day headers
		expect(querySelectorAllSpy).toHaveBeenCalledWith('.dayHeader')

		// Check that jumpToDate mapped the day header ids and sorted them
		expect(sortSpy).toHaveBeenCalled()
		expect(mapSpy).toHaveBeenCalled()

		// Check that jumpToDate scrolled to the selected date
		expect(getElementByIdSpy).toHaveBeenCalledWith('1735707600000')

		// Check that jumpToDate scrolled to the top of the page if the selected date is not in the DOM
		wrapper.find("input[type='date']").simulate("change", { target: { value: "2020-01-01" } })
		expect(getElementsByTagNameSpy).toHaveBeenCalledWith('h1')

		// Check that jumpToDate scrolled to the nearest date if the selected date is not in the DOM
		wrapper.find("input[type='date']").simulate("change", { target: { value: "2025-01-02" } })
		expect(getElementByIdSpy).toHaveBeenCalledWith('1935794000000')
	})
})