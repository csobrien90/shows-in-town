import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import App from '../App'

describe("<App />", () => {
	it("renders without crashing", () => {
		shallow(<App />)
	})
	
	it("renders App h1", () => {
		const wrapper = shallow(<App />)
		const welcome = <h1>Shows In Town</h1>
		expect(wrapper.contains(welcome)).toEqual(true)
	})
})