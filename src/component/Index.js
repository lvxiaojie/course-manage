import React,{Component} from 'react'
import Banner from './banner/Banner'

import College from './content/College'


class Index extends Component{
	render(){
		return(
			<div>
				{/*<Header />*/}
				<Banner />
				<College name='college_one'/>
				<College name='college_two'/>
				<College name='college_three'/>
				<College name='college_four'/>
				{/*<Footer />*/}
				{/*<CollegeTwo  />
				<CollegeThree />
				<CollegeFour />*/}
			</div>

			)
	}
}
export default Index