import React, {
	Component
} from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import AddCourse from './courseMore/AddCourse'
import ScreenLoading from './ScreenLoading'
class App extends Component {
	constructor(args) {
		super()
			// code
	}
	render() {

		return (
			<div className="app_wrap">
			    <Header />
			    <AddCourse />
				<div className='child'>
					{this.props.children}
				</div>
				
				<Footer />
				<ScreenLoading />

			</div>

		)
	}

	// methods
}
export default App