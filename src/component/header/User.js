import React,{Component} from 'react'
import {userList,deletUser,givePermission} from '../Fetch'
class User extends Component {
	constructor(args) {
		// code
		super(args);
		this.state={
			userList:[]
		}
	}
	componentWillMount(){
		userList().then((data)=>{
			
			this.setState({
				userList:data
			})

		})
	}
	updata(){
		userList().then((data)=>{
			
			this.setState({
				userList:data
			})

		})
	}
	delet(name) {
		var r = confirm("确定删除此用户吗?");
		if (r == true) {
			deletUser(name).then((data) => {
				if (data.success) {
					alert("删除成功！")
					this.updata();
				} else {
					return;
				}
			}, (rejected) => {
				alert('网络错误')
				console.log(rejected);
			})
		} else {

		}

	}
	give(name,is_teacher){
		// console.log(is_teacher)
		if (is_teacher) {
			alert("该用户已经是老师身份！");
		} else {
			givePermission(name, true).then((data) => {
				this.updata();
				alert("成功赋予权限！");
			}, (rejected) => {
				alert("网络错误")
			})
		}
		/**/
	}
	back(name,is_teacher){
		
		if (is_teacher) {
			givePermission(name, false).then((data) => {
				this.updata();
				alert("成功收回权限！");
			}, (rejected) => {
				alert("网络错误")
			})
			
		} else {
			alert("该用户已经收回权限！");
		}
		/**/
	}
	render(){
		let _this = this;
	
		return(
			<div className='user_wrap'>
				<div className='user_table'>
				    <div className='user_title'>
				    	<h4>用户管理</h4>
				    </div>
					<div className='user_content'>
						<table className='table table-hover'>
							<thead>
								<tr>
								    <th>用户名</th>
								    <th>用户邮箱</th>
								    <th>用户类型</th>
								    <th>操作</th>
							    </tr>
							</thead>
							<tbody>
	{
		this.state.userList.map(function(item,index){
			return(
				<tr key={index}>
				   <td>{item.name}</td>
				   <td>{item.email}</td>
				   <td>{item.is_teacher?'老师':'学生'}</td>
				   <td>
					   <span className='btn btn-success btn-xs' title='赋予老师权限' onClick={()=>_this.give(item.name,item.is_teacher)}><i className='fa fa-check'></i></span>
					   <span className='btn btn-primary btn-xs opeation' title='收回权限' onClick={()=>_this.back(item.name,item.is_teacher)}><i className='fa fa-institution'></i></span>
					   <span className='btn btn-danger btn-xs opeation' title='删除用户' onClick={()=>_this.delet(item.name)}><i className='fa fa-trash'></i></span>
					</td>
 			    </tr>
				)
		})
	}
							</tbody>
						</table>
				    </div>
				</div>
			</div>

			)
	}

	// methods
}
export default User