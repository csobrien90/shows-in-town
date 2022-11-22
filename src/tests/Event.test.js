import { configure, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })
import {shallow} from 'enzyme'

import Event from '../components/Event'

// Test Event component
const event = {
	title: "Event Title",
	address: '123 Main St',
	time: 'Monday, January 1, 2021 12:00 AM',
	desc: 'Sample description',
	link: 'https://www.google.com',
	epoch: 1609459200
}

describe("", () => {
	// Test for event as data in Event component props 
	it("accepts event props", () => {
		const wrapper = mount(<Event data={event} />)
		expect(wrapper.props().data).toEqual(event)
	})

	// Test for title in Event component
	it("contains event title", () => {
		const wrapper = mount(<Event data={event} />)
		const value = wrapper.find("h3").text()
		expect(value).toEqual("Event Title")
	})
})