import React, {
	Component
} from 'react'
import {
	addCourse,
	uploadImage
} from '../Fetch'
import {
	connect
} from 'react-redux'
import $ from 'jquery'
import {showLoading} from '../../Redux/Action/Action'
class AddCourse extends Component {
	constructor(args) {
		// code
		super(args);
		this.state = {
			kind: '',
			name: '',
			description: '',
			file: '',
			src: ''
		}
	}
	getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	chooseImage(e) {
		let image = e.target.files[0];
		this.setState({
			src: this.getObjectURL(image)
		})
	}
	add() {
		this.props.dispatch(showLoading(true));
			let formdata = new FormData($('#course_form')[0]);
			formdata.append('grade', $("#kind").val());
			formdata.append('name', this.state.name);
			formdata.append('author', localStorage.getItem('userName'));
			formdata.append('description', this.state.description);

			addCourse(formdata).then((data) => {
				if (data.success) {
					this.props.dispatch(showLoading(false));
					alert(data.message);
					location.reload()
				} else {
					alert(data.message);
					this.props.dispatch(showLoading(false));
				}
			})
	}
	render() {
		return (
			<div className="modal fade" id='addCourse' tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <h4 className="modal-title" id="myModalLabel">上传课程</h4>
			      </div>
			      <div className="modal-body">
			        <form className="form-horizontal" encType='multipart/form-data'  id = "course_form">
					  <div className="form-group">
					    <label className="col-sm-2 control-label">上传类别</label>
					    <div className="col-sm-10">
					      <select type="email" className="form-control" placeholder="Email" id='kind'>
						      <option value='college_one'>大一课程</option>
						      <option value='college_two'>大二课程</option>
						      <option value='college_three'>大三课程</option>
						      <option value='college_four'>大四课程</option>
					      </select>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">课程名称</label>
					    <div className="col-sm-10">
					      <input type="text" required='required' className="form-control" placeholder="课程名称" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-sm-2 control-label">课程描述</label>
					    <div className="col-sm-10">
					      <textarea type="password" className="form-control" placeholder="课程描述" value={this.state.description} onChange={(e)=>{this.setState({description:e.target.value})}}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label 	className="col-sm-2 control-label">上传课件</label>
					    <div className="col-sm-10">
					      <input type='file'  name = 'course_file' />
					    </div>
					  </div>
					  <div className="form-group">
					    <label 	className="col-sm-2 control-label">课件图片</label>
					    <div className="col-sm-10">
							<input className='course_image' name="course_image" type="file" 
							onChange={(e)=>this.chooseImage(e)} accept="image/gif,image/jpeg,image/jpg,image/png"/>
						    <i className='image_btn' onClick={(e)=>{this.setState({src:''})}}>清空
							</i>
						{this.state.src!=''?<img style={{width:'100%',marginTop:'8px'}} 
						// src={require('../../images/computer.jpg')}
						src={this.state.src}
						></img>	:null}

					    </div>
					  </div>
                  </form>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
			        <button type="button" className="btn btn-primary" onClick={()=>this.add()} data-dismiss="modal">添加</button>
			      </div>
			    </div>
			  </div>
          </div>
		)
	}

	// methods
}
const mapStateToProps = (state) => {
	return {

	};
}

export default connect(mapStateToProps)(AddCourse); 
