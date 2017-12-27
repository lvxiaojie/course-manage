import React,{Component} from 'react'
import {signup} from '../Fetch.js'
import { hashHistory } from 'react-router'
class Register extends Component{
	constructor(props) {
		super(props);
		this.state={
			username:'',
			email:'',
			password:'',
			confirmPass:''
		}
	}
	register(e){
		e.preventDefault();
		if(this.state.password!==this.state.confirmPass){
			alert("两次密码不一样");
			return;
		}
		signup(this.state.username,this.state.password,this.state.email).then((data)=>{
			if(data.success){
				alert("注册成功")
				hashHistory.push('/login')
			}
			else{
				alert(data.message);
			}
		},(rejected)=>{
			alert('网络错误')
			console.log(rejected);
		})


	}
	render(){
		return(
			<div className='login'>
				<form className='login_form' onSubmit={(e)=>this.register(e)}>
					<h4>注 册</h4>
					<div className='login_wrap'>
						<input type='text' value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} className='form-control' placeholder='用户名' required/>
						<input type='email' value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} className='form-control password' placeholder='邮箱' required/>
						<input type='password' value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} className='form-control password' placeholder='密码' required/>
						<input type='password' value={this.state.confirmPass} onChange={(e)=>{this.setState({confirmPass:e.target.value})}} className='form-control password' placeholder='确认密码' required/>
						<span className='hasno'>已有账号？<a href='#/login'>立即登录</a></span>
						<button className='btn btn-lg btn_sign_in' type='submit'>注 册</button>
					</div>
				</form>
			</div>
			)
	}
}
export default Register