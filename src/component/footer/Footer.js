import React,{Component} from 'react'
import '../../css/foot.css'
class Footer extends Component{
	render(){
		return(
			<div className='footer'>
				<ul className='footer_content'>
					<li>关于我们</li>
					<li>联系我们</li>
					<li>帮助中心</li>
					<li>意见反馈</li>
				</ul>
		    </div>
			)
	}
}
export default Footer