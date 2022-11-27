import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import App from '../App'

describe("<App />", () => {
	const wrapper = shallow(<App />)

	it("renders without crashing", () => {
		expect(wrapper).toBeTruthy()
	})

	it("renders App main tag with loading class", () => {
		expect(wrapper.find("main").hasClass("loading")).toEqual(true)
	})

	it("renders App with 'Shows in Town' h1", () => {
		expect(wrapper.find("h1").text()).toEqual("Shows In Town")
	})
})