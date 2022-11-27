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
		// Render DayHeader with epoch for January 1st 1970
		let zeroEpochDate = new Date(0)
		const wrapper1970 = shallow(<DayHeader epoch={0}/>)
		
		// Confirm header date from another year has been formatted with year
		const localizedDateString = zeroEpochDate.toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
		const zeroEpochHeader = <h2>{localizedDateString}</h2>
		expect(wrapper1970.contains(zeroEpochHeader)).toEqual(true)

		// Render DayHeader with epoch for January 1st this year
		const januaryFirstThisYear = new Date(new Date().getFullYear(), 0, 1)
		const wrapperThisYear = shallow(<DayHeader epoch={Date.parse(januaryFirstThisYear)}/>)

		// Confirm header date from this year has been formatted without year
		const localizedDateStringThisYear = januaryFirstThisYear.toLocaleDateString('en-us', { weekday: 'long', month: 'long', day: 'numeric' })
		const januaryFirstThisYearHeader = <h2>{localizedDateStringThisYear}</h2>
		expect(wrapperThisYear.contains(januaryFirstThisYearHeader)).toEqual(true)
	})
})