import React,{Component} from 'react'
import {hashHistory} from 'react-router'
import {exit} from '../Fetch'

import '../../css/index.css'
import '../../css/fonts/font-awesome.min.css'

class Header extends Component {
	constructor(props) {
		// code
		super(props);
		this.state={
			username:'',
			is_admin:''
			
		}
	}
	beforeRender() {
		if (localStorage.hasOwnProperty('userName')) {

			this.setState({

				username: localStorage.getItem('userName'),
				is_admin:localStorage.getItem('is_admin')
			})

		} else {
			return;
		}
	}
	componentWillMount() {
		// console.log(localStorage.hasOwnProperty('userName'));
		this.beforeRender()
	}
	componentWillReceiveProps(nextProps) {
		this.beforeRender()
	}
	componentWillUnmount() {
		alert('exit')
	}
	exit(e){
		this.setState({
			username:''
		})
		exit();
		// localStorage.removeItem('userName');
		// localStorage.removeItem('userToken');
		// localStorage.removeItem('is_admin');
		// localStorage.removeItem('is_teacher');
		localStorage.clear();
		hashHistory.push('');
	}
	render() {
	
		return(
			<header className='header_wrap'>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 header'>
							<div className='header_left'>
								<div className='header_alert'>
								    <img src={require('../../images/logo_book.png')} alt='logo'/>
									{/*<i className='fa fa-home'></i>*/}
						            <span></span>
								</div>
								<div>
									<a className='logo' href='/'>云课堂</a>
								</div>
							</div>
				            {
				            	this.state.username === ''?
				            	<div className='user_info'>
					                <a className="login" href='#/login'>登录</a>
					                <a className='regist' href='#/register'>注册</a>
				                </div>
				                :
				                <div>
				                	<div className="dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				                	    <span className='user_name'>{this.state.username} </span>
				                	    <span className='caret'></span>
				                	</div>
				                    <ul className="dropdown-menu pull-right" aria-labelledby="dropdownMenu1">
				                        <div className='arrow_up'></div>
				                        {
				                        	this.state.is_admin==='true'?
				                        	<li role="presentation" >
				                		       <a role="menuitem" href='#/user'>用户管理</a>
				                	        </li>:null
				                        }
				                	    <li role="presentation" >		                	    
				                		    <a role="menuitem" onClick={(e)=>{this.exit(e)}}>退出登录</a>
				                	    </li>
				                	    
				                    </ul>
				                </div>
				            }


						</div>
					</div>
				</div>
			</header>

			)
	}

	// methods
}
export default Header