import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import Datepicker from '../components/Datepicker'

describe("<Datepicker />", () => {
	it("renders without crashing", () => {
		shallow(<Datepicker />)
	})
})