import { configure, shallow } from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
configure({ adapter: new Adapter() })

import Timeline from "../components/Timeline"

describe("<Timeline />", () => {
	it("renders without crashing", () => {
		shallow(<Timeline />)
	})
})