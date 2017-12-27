import React,{Component} from 'react'
class Banner extends Component{
	render(){
		return(
			<div className='banner_wrap'>
				<div className='banner_pic'>
					<div className='banner_title'>
						{/*<h1>云课堂</h1>*/}
						<h4>汇集全国多家知名大学里广受学生好评的计算机老师，每一门课程都由他们亲自制作，权威、专业！</h4>
						{localStorage.getItem('is_admin')==='true'||localStorage.getItem('is_teacher')==='true'?
						<a className='join_us' data-toggle="modal" data-target="#addCourse">添加课程</a>

					:
					    <a className='join_us welcome'
					    >欢迎使用</a>
					    }
					</div>
				</div>
				<section className='product_info'>
					<div className='container'>
						<div className='row'>
							<div className='col-xs-4'>
								<span className='product_item '>
									<div>
										<img src={require('../../images/intro1.png')} alt='资源评论'/>
										<h4 className='pic_intro'
	                                        >资源评论</h4>
									</div>
								</span>
							</div>
							<div className='col-xs-4'>
								<span className='product_item'>
									<div >
										<img src={require('../../images/colud.png')} alt='云端下载'/>
										<h4 className='pic_intro'
	                                        >云端下载</h4>
									</div>
								</span>
							</div>
							<div className='col-xs-4'>
								<span className='product_item'>
									<div>
										<img src={require('../../images/online.png')} alt='在线学习'/>
										<h4 className='pic_intro'
	                                        >在线学习</h4>
									</div>
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>

			)
	}
}
export default Banner