import React,{Component} from 'react'
import {collegeCourse,deletCouser} from '../Fetch'
class CollegeThree extends Component {
	constructor(props) {
		// code
		super(props);
		this.state={
			courseList:[],
			
		}
	}
	componentWillMount(){
		collegeCourse('college_three').then((data)=>{
			
			this.setState({
				courseList:data
			})
		},(rejected)=>{
			alert('网络错误')
		})

		
	}
	delet(id) {
		var r = confirm("确定删除此课件吗?");
		if (r == true) {
			deletCouser(id).then((data) => {
				location.reload();
				// alert("删除成功");
			}, (rejected) => {
				alert("网络错误")
			})
		} else {

		}
	}
	render(){
		var _this=this;
		return(
			<div>
				<div className='tab_wrap'>
				    <div className='tab'>
				    	<a href='#/collegeOne' >大一课程</a>
				    	<a href='#/collegeTwo' >大二课程</a>
				    	<a href='#/collegeThree' className='tab_a'>大三课程<span className='triangle'></span></a>
				    	<a href='#/collegeFour' >大四课程</a>
				    </div>

			    </div>
			    <div className='tab_content'>
			    	<div className='container'>
			    	    
			    		<div className='row'>
			    			{
					this.state.courseList.map(function(item,index){
						return(
							<div className='col-sm-4 col-md-3 col-xs-6' key={index}>
								<figure className='course_item '>
									    <a href={'#/couserDetail/'+item._id} className='tab_href'></a>
									    <div className='course_img'>
							            	    	<img src={localStorage.getItem('servie_ip') + 'images/' + item.image_url} alt='course'/>
							            	    </div>
							            		<figcaption className='course_title'>
							            			<div className='course_name' title='课程名称'>{item.name}</div>
							            			<div className='course_author' title='作者'>{item.author}</div>
							            			<div>
							            			    <span className='couser_time' title='创建时间'>{item.datetime}</span>
							            			    {localStorage.getItem('userName')==item.author
							            			    ||localStorage.getItem('userName')=='admin'?
							            			    <i className='fa fa-trash course_trash' onClick={()=>_this.delet(item._id)}
							            			     title='删除课程'></i>:null}
							            			</div>
							            		</figcaption>
					            	  
		            	            </figure>
		            					
		            		</div>
		            				

		            		)
		            			
		            })
		            		
		        }		
			    		</div>
			    			
			    		
			    	</div>
			    </div>
			</div>

			)
	}

	// methods
}
export default CollegeThree