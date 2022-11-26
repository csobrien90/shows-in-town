import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import DayHeader from '../components/DayHeader'

// Test DayHeader component
describe("<DayHeader />", () => {
	it("renders without crashing", () => {
		shallow(<DayHeader epoch={Date.parse(new Date())} />)
	})

	it("renders 'Today' h2 when epoch is now", () => {
		const todayEpoch = Date.parse(new Date())
		const wrapper = shallow(<DayHeader epoch={todayEpoch}/>)
		const todayHeader = <h2>Today</h2>
		expect(wrapper.contains(todayHeader)).toEqual(true)
	})

	it("sets header id for midnight on given epoch", () => {
		// Generate random date
		const randomEpoch = Date.parse(new Date(Math.random() * 1000000000000))
		const midnightEpoch = new Date(randomEpoch).setHours(0,0,0,0)
		
		// Render DayHeader with random epoch
		const wrapper = shallow(<DayHeader epoch={randomEpoch}/>)

		// Confirm header id matches midnightEpoch
		expect(wrapper.find('header').prop('id')).toEqual(midnightEpoch)
	})

	it("renders formatted date h2 when epoch is not today", () => {
		// Render DayHeader for epoch 0
		let zeroEpochDate = new Date(0)
		const wrapper = shallow(<DayHeader epoch={0}/>)
		
		// Confirm header date has been formatted
		const localizedDateString = zeroEpochDate.toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
		const zeroEpochHeader = <h2>{localizedDateString}</h2>
		expect(wrapper.contains(zeroEpochHeader)).toEqual(true)
	})
})