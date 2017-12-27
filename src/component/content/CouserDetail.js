import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	idToFile,
	comment,
	getComment,
	recover,
	del_comment
} from '../Fetch'
import $ from 'jquery'
var emoji_list = [
	['😄', '😃', '😀', '😊'],
	['😝', '😛', '😳', '😬'],
	['😒', '😞', '😣', '😢'],
	['😱', '😠', '😡', '😤']
];
// console.log(emoji_list)
class CouserDetail extends Component {
	constructor(props) {
			super(props);
			this.state = {
				courseDetail: [],
				comment: '',
				contents: [],
				downUrl: '',
				comments: [],

			}
		}
		// componentWillReceiveProps(nextProps) {


	// }
	componentWillMount() {

	}
	componentDidMount() {
		const id = this.props.params.id;
		// console.log(id);
		idToFile(id).then((data) => {
			getComment(id).then((comments) => {
				this.setState({
					comments: comments,
					courseDetail: data,
					downUrl: "http://localhost:8080/" + data.grade + '/' + data.file_name
				})
			})


		})

	}
	auth() {
		return localStorage.hasOwnProperty('userName');
	}
	post() {
		if (!this.auth()) {
			alert('请先登录');
			return;
		}
		const id = this.props.params.id;
		let username = localStorage.getItem("userName");
		let body = 'file_id=' + id;
		body += '&username=' + username;
		body += '&text=' + this.state.comment;
		comment(body).then((data) => {
			if (data.success) {
				// alert("留言成功！");
				location.reload()
			}
		})


	}
	addRecover(event, id) {
		if (!this.auth()) {
			alert('请先登录');
			return;
		}
		let body = '&username=' + localStorage.getItem("userName");
		body += '&text=' + $(event.target).prev().val();
		recover(id, body).then((data) => {
			if (data.success) {
				// alert("留言成功！");
				location.reload()
			}
		})

	}
	down_file(e) {
		if (!this.auth()) {
			alert('请先登录');
			return;
		}
		window.open(this.state.downUrl);
	}
	delComment(id) {
		var r = confirm("😀确定删除此评论吗?");
		if (r == true) {
			del_comment(id).then((data) => {
				if (data.success) {
					// alert("删除成功！");
					location.reload()
				}
			})
		} else {

		}
	}
	insertEmoji(e) {
		// console.log($(e.target).html())
		this.setState({
			comment: this.state.comment + $(e.target).html()
		})
	}  
	render() {
		var _this = this;

		return (
			<div className='cousre_detail_wrap'>
				<div className='container'>
					<div className='row'>
						<div className='couser_detail'>
							<div className='couser_detail_title'>
								<h3>{this.state.courseDetail.name}</h3>
								<ul className='couser_detail_infromation'>
									<li>作者名：{this.state.courseDetail.author}</li>
									<li>创建时间：{this.state.courseDetail.datetime}</li>
									<li>文件类型:{this.state.courseDetail.type}</li>
									<li>浏览量：{this.state.courseDetail.down_num}</li>
								</ul>
							</div>
							<div className='couser_detail_menu'>
								<ul className='couser_detail_menu_ul'>
									<li className='active'>
										<span data-target="#details" role="tab" data-toggle="tab" aria-expanded="true">课程详情</span>
										</li>
                                {/*<li>
									<span data-target="#modify" role="tab" data-toggle="tab" aria-expanded="true">编辑</span>
									</li>*/}

								</ul>
								<span className='download' onClick={(e)=>
									this.down_file(e)
								} 
								// href={this.state.downUrl} 
								target="_blank">下载</span>
							</div>
							<section className='tab-content active_more_content' id="tab-content">
								<div className='tabpanel' id='details' className="tab-pane active">
									{/*<h5 className='course_dic'>课程概述</h5>*/}
									<div className='course_description'>
										{this.state.courseDetail.description!=''?<pre>
											{this.state.courseDetail.description}
										</pre>:null}
									</div>
								</div>
								<div className='tabpanel' id='modify' className="tab-pane">
									{/*<h2>修改</h2>*/}
								</div>
							</section>

						</div>
					</div>
					<div className='row'>
						<div className='comment_num'>
						   <h4>留言：<span>({this.state.comments.length})</span></h4>
					    </div>
					</div>
					{
						this.state.comments.map(function(item,index){
							return(

								<div className='row' key={index}>
						            <div className='comment_warp'>
						            	<div className='comment_img'>
                                           <img src={require('../../images/book.png')}/>
						            	</div>
						            	<div className='comment_content'>
						            		<div className='comment_datetime'>
						            		<a className='comment_username'>{item.username} • </a>
						            		<span className='comment_datetime'> {item.datetime} </span>
						            		{localStorage.getItem('userName')==item.username
                                            ||localStorage.getItem('userName')==_this.state.courseDetail.author
							                ||localStorage.getItem('userName')=='admin'?
							                <span className='comment_del' onClick={(e)=>_this.delComment(item._id)}> 删除 </span>
							            			    :null}


						            		
						            		</div>
						            		<div>{item.text}
						            		<i className="fa fa-comment-o recovery-icon collapsed" 
						            		data-toggle="collapse" data-target= {'#' + item._id}>({item.Recovery.length})</i>
						            		</div>
						            		<div className="recovery collapse" id={item._id}>
						            		  {
						            		  	item.Recovery.map(function(x,index){
						            		  		return(
						            		             <div key={index}>
						            		             <img className='head-icon' src={require('../../images/head2.jpg')}/>
						            		             <a className="recover-username">{x.username}:</a>
						            		             <span className="recover-comment">{x.text}</span>
						            		             <div>
						            		             	<span className="recover-time">{x.datetime}</span>
						            		             </div>
						            		             <div className="recover-boder"></div>
						            		             </div>
						            		  			)
						            		  	})
						            		  }


						            		  <div><textarea className='form-control recover-text' 
						            		  // value={_this.state.recover} 
						            		  // onChange={(e)=>{_this.setState({recover:e.target.value})}}
						            		  />
						            		  <button className='btn btn-default recover-btn'
						            		  onClick={(e)=>_this.addRecover(e,item._id)}>
						            		  {localStorage.getItem('userName')==item.username?'回复':'我也说一句'}
						            		  </button>
						            		  </div>
						            		</div>

						            	</div>
						            </div>
					            </div>

								)
						})
					}
					<div className='row'>
						<div className='comment_warp'>
						    <div className='comment_img'>
                                <img src={require('../../images/book.png')}/>
						    </div>
						    <div className='comment_content'>
						        <div className='comment_datetime'>
						        <a className='comment_username'>{localStorage.getItem("userName")}</a>
            
            <span className="dropdown emoji-span">
				<a href="#" className="dropdown-toggle" data-toggle="dropdown">
					表情
					<b className="caret"></b>
				</a>
				<ul className="dropdown-menu">                  
				 <table style={{marginTop:'0px',marginBottom:'0px',width:'96%',marginLeft:'2%',backgroundColor:'#fff'}} 
                       className="table table-bordered">
{/*                       <thead>
                         <tr>
                         <th>添</th>
                         <th>加</th>
                         <th>表</th>
                         <th>情</th>
                         </tr>
                         </thead>*/}
                        <tbody>
                          
					    {
					    	emoji_list.map(function(x, index) {
					    		return (
					    			<tr key={index}>
					    			<td onClick={(e)=>_this.insertEmoji(e)} className='emoji_table'>{x[0]}</td>
					    			<td onClick={(e)=>_this.insertEmoji(e)} className='emoji_table'>{x[1]}</td>
					    			<td onClick={(e)=>_this.insertEmoji(e)} className='emoji_table'>{x[2]}</td>
					    			<td onClick={(e)=>_this.insertEmoji(e)} className='emoji_table'>{x[3]}</td>
					    			  </tr>
					    			)
					    	})
					    }
					  
					 </tbody>
					     </table>
				</ul>
			</span>
						        </div>
						        <div><textarea className='form-control' style={{height:'120px'}} value={this.state.comment} onChange={(e)=>{this.setState({comment:e.target.value})}}/></div>
						        <button className='btn btn-primary cousre_detail_submit' onClick={()=>this.post()}>评论</button>
						    </div>
							
						</div>
					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(CouserDetail);