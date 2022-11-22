import { configure, mount } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })
import {shallow} from 'enzyme'

import App from '../App'

// Test App component
it("renders without crashing", () => {
	shallow(<App />)
})

// Test for h1 element in App component
it("renders App h1", () => {
	const wrapper = shallow(<App />)
	const welcome = <h1>Shows In Town</h1>
	expect(wrapper.contains(welcome)).toEqual(true)
})