import React,{Component} from 'react'
import '../../css/foot.css'
class Introducation extends Component{
	render(){
		return(
			<div>
	<div className='child_foot'></div>
<div className="block g-wrap container cert c2 f-cb">
<div className="f-fl img">
<img src={require('../../images/info1.png')}/>
</div>
<div className="f-fr text f-f0 foot1">
<h2 className="f-f0">页面简洁</h2>
<div className="detail s-fc5">
页面简洁美观，操作方便<br/>
这不仅仅是简单的网页浏览，更是对您视觉的抚摸。<br/>
</div>
</div>
</div>
<div className="bd"></div>
	<div className='child_foot'></div>
<div className="block g-wrap container cert c1 f-cb">
<div className="f-fl text f-f0 foot2">
<h2 className="f-f0">先进的在线学习方式</h2>
<div className="detail s-fc5">
应用时下最流行的教学方式，定期上传教学课件，教学视频、在线评论回复。<br/>
比起通过书籍自学，更快速有效。
</div>
</div>
<div className="f-fr img img2">
<img src={require('../../images/info2.png')}/>
</div>
</div>
<div className="bd"></div>
	<div className='child_foot'></div>
<div className="block g-wrap container cert c3 f-cb">
<div className="f-fl img img3">
<img src={require('../../images/info3.png')}/>
</div>
<div className="f-fr text f-f0 foot3">
<h2 className="f-f0">随时随地掌握学习进度</h2>
<div className="detail s-fc5">
将课程统统装进你的电脑，随时随地复习。<br/>
无论是在家里，还是在咖啡馆，随时随地，学习进度轻松掌握。
</div>
</div>
</div>


		    </div>
			)
	}
}
export default Introducation