import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute,hashHistory} from 'react-router'

import Login from './component/login/Login'
import App from './component/App'
import Index from './component/Index'
import Register from './component/login/Register'
import Courses from './component/courseMore/Courses'
import CollegeOne from './component/courseMore/CollegeOne'
import CollegeTwo from './component/courseMore/CollegeTwo'
import CollegeThree from './component/courseMore/CollegeThree'
import CollegeFour from './component/courseMore/CollegeFour'
import User from './component/header/User'
import CouserDetail from './component/content/CouserDetail'
import {
  Provider
} from 'react-redux'
import store from './Redux/Store/Store'
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
          <IndexRoute component={Index}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/user' component={User}/>
          <Route path='/couserDetail/:id' component={CouserDetail}/>
          <Route path='/collegeOne' component={Courses}>
  	        <IndexRoute component={CollegeOne}/>
  	        <Route path='/collegeTwo' component={CollegeTwo}/>
  	        <Route path='/collegeThree' component={CollegeThree}/>
  	        <Route path='/collegeFour' component={CollegeFour}/>
          </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
