import React, {
	Component
} from 'react'
import Switch, {
	Case
} from 'react-switch-case';
import {
	collegeCourse,
	seeFile
} from '../Fetch'
import Introducation from '../footer/Introducation'

class College extends Component {
	constructor(props) {
		super(props);
		let collegeName;
		if (this.props.name === 'college_one') {
			collegeName = '大一课程'
		} else if (this.props.name === 'college_two') {
			collegeName = '大二课程'
		} else if (this.props.name === 'college_three') {
			collegeName = '大三课程'
		} else if (this.props.name === 'college_four') {
			collegeName = '大四课程'
		}
		this.state = {
			courseList: [],
			collegeName: collegeName
		}
	}
	componentWillMount() {
		collegeCourse(this.props.name).then((data) => {
			data.sort(function(a, b) {
				return (new Date(b.datetime.replace(/-/g, '/')).getTime() - new Date(a.datetime.replace(/-/g, '/')).getTime());
			});
			let newData = [];
			newData = data.slice(0, 4);
			this.setState({
				courseList: newData
			})
		}, (rejected) => {
			alert('网络错误')
		})
	}
	seeFile(id) {
		seeFile(id).then((data) => {
			//down_num ++
		})
	}
	render() {
		var _this = this;
		return (
			<div className='freshman_wrap content_wrap'>
				<div className='container'>
					<div className='row'>
						<div className='freshman_title'>
				            <h4>{this.state.collegeName}</h4>
				            <div className='freshman_read_more'>
					            {
					            	<Switch condition={this.props.name}>
						            	<Case value='college_one'>
							            	<a href='#/collegeOne'>
							            	{/*read more <i className='fa fa-plus'></i>*/}
							            	More
							            	</a>
						            	</Case>
						            	<Case value='college_two'>
							            	<a href='#/collegeTwo'>
							            	{/*read more <i className='fa fa-plus'></i>*/}
							            	More
							            	</a>
						            	</Case>
						            	<Case value='college_three'>
							            	<a href='#/collegeThree'>
							            	{/*read more <i className='fa fa-plus'></i>*/}
							            	More
							            	</a>
						            	</Case>
						            	<Case value='college_four'>
							            	<a href='#/collegefour'>
							            	{/*read more <i className='fa fa-plus'></i>*/}
							            	More
							            	</a>
						            	</Case>
					            	</Switch>
					            }
				            </div>
			            </div>
					</div>
					<div className='row'>
		            	{
		            		this.state.courseList.map(function(item,index){

		            			return(
		            				<div className='col-sm-4 col-md-3 col-xs-6' key={index}>
		            					<a href={'#/couserDetail/'+item._id} onClick={()=>_this.seeFile(item._id)}>
		            						<figure className='course_item '>
							            	    <div className='course_img'>
							            	    	<img src={localStorage.getItem('servie_ip') + 'images/' + item.image_url} alt='course_image'/>
							            	    </div>
							            		<figcaption className='course_title'>
							            			<div className='course_name' title='课程名称'>{item.name}</div>
							            			<div className='course_author' title='作者'>{item.author}</div>
							            			<div><span className='couser_time' title='创建时间'>{item.datetime}</span></div>
							            		</figcaption>
		            	                    </figure>
		            					</a>
		            				</div>

		            				)
		            		})
		            	}
					</div>
				</div>
				{this.props.name === 'college_four'?<Introducation />:null}
			</div>


		)
	}
}
export default College