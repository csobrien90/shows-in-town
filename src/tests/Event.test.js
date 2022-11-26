import { configure, shallow, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import Event from '../components/Event'

// Event mock data
const event = {
	title: "Event Title",
	address: '123 Main St',
	time: 'Monday, January 1, 2021 12:00 AM',
	desc: 'Sample description',
	link: 'https://www.google.com',
	epoch: 1609459200
}

describe("<Event />", () => {
	it("renders without crashing", () => {
		shallow(<Event data={event} />)
	})

	it("accepts event props", () => {
		const wrapper = mount(<Event data={event} />)
		expect(wrapper.props().data).toEqual(event)
	})

	it("contains event title", () => {
		const wrapper = shallow(<Event data={event} />)
		const value = wrapper.find("h3").text()
		expect(value).toEqual("Event Title")
	})
})