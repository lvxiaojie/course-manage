import React,{Component} from 'react'


class Courses extends Component {
	constructor(props) {
		super(props);
		// code
		this.state={
			is_admin:'',
			is_teacher:''
		}
	}
	componentWillMount(){
		if(localStorage.hasOwnProperty('userName')){
			this.setState({
				is_admin:localStorage.getItem('is_admin'),
				is_teacher:localStorage.getItem('is_teacher')
			})
		}
	}
	render() {
	
		return(
			<div className='courseList'>
				<div className='courseList_banner'>
					<div className='container'>
						<h3 className='courseList_title'>人人都可以在这里体验到时下最流行的云课堂,系统地掌握专业知识。</h3>
						 {
			                	this.state.is_admin==='true'||this.state.is_teacher==='true'?
			                	<a className='btn btn-sm addCourse' data-toggle="modal" data-target="#addCourse">添加课程 <i className='fa fa-plus'></i></a>
			                    :null
			                }
						
				    </div>
			    </div>
			    <div className='child'>
                    {this.props.children}
			    </div>
			    
			</div>
			
			)
	}
}
export default Courses