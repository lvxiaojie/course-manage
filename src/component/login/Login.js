import React,{Component} from 'react'
import {login} from '../Fetch.js'
import { hashHistory } from 'react-router'
class Login extends Component {
	constructor(props) {
		super(props);
		this.state={
			username:'',
			password:''
		}
	}
	componentWillMount() {
		if(localStorage.hasOwnProperty('userName')){
			hashHistory.push('');
		}
	}
	login(e){
		e.preventDefault();
		login(this.state.username,this.state.password).then((data)=>{
			if(data.success){
				
				localStorage.setItem("userName",this.state.username);
				localStorage.setItem("userToken",data.token);
				localStorage.setItem("is_admin",data.is_admin);
				localStorage.setItem("is_teacher",data.is_teacher);

				hashHistory.push('');
				
			}else{
				alert(data.message);
			}
		},(rejected)=>{
			alert('网络错误')
			// console.log(rejected);
		})
	}
	render() {
		return(
			<div className='login'>
				<form className='login_form' onSubmit={(e)=>this.login(e)}>
					<h4>登 录</h4>
					<div className='login_wrap'>
						<input required="required" type='text' value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} className='form-control' placeholder='用户名'/>
						<input required="required" type='password' value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} className='form-control password' placeholder='密码'/>
						<span className='hasno'>还没账号？<a href='#/register'>立即注册</a></span>
						<button className='btn btn-lg btn_sign_in' type='submit'>登 录</button>
					</div>
				</form>
			</div>
			)
	}
}
export default Login