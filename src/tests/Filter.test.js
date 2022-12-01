import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import Filter from "../components/Filter"

describe("<Filter />", () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Filter />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it("renders a button with an svg in it", () => {
		expect(wrapper.find("button")).toHaveLength(1)
		expect(wrapper.find("button svg")).toHaveLength(1)
	})

	it("renders a button with the correct class, title, and aria-label", () => {
		expect(wrapper.find("button").hasClass("filter-button")).toEqual(true)
		expect(wrapper.find("button").prop("title")).toEqual("Filter")
		expect(wrapper.find("button").prop("aria-label")).toEqual("Filter")
	})

	it("renders a button with click event showHideFilters", () => {
		expect(wrapper.find("button").prop("onClick")).toBeDefined()

		// Test that setExpandedSection is called with null when expandedSection is filter-options
		const setExpandedSectionFilter = jest.fn()
		const expandedSectionFilter = "filter-options"
		wrapper.setProps({ setExpandedSection: setExpandedSectionFilter, expandedSection: expandedSectionFilter })		
		wrapper.find("button").simulate("click")
		expect(setExpandedSectionFilter).toHaveBeenCalledWith(null)
		
		// Test that setExpandedSection is called with "filter-options" when expandedSection is not filter-options
		const setExpandedSectionEmpty = jest.fn()
		const expandedSectionEmpty = ""
		wrapper.setProps({ setExpandedSection: setExpandedSectionEmpty, expandedSection: expandedSectionEmpty })
		wrapper.find("button").simulate("click")
		expect(setExpandedSectionEmpty).toHaveBeenCalledWith("filter-options")
	})

})