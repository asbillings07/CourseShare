import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Forbidden from './components/Forbidden'
import UnhandledError from './components/UnhandledError'
import NotFound from './components/NotFound'
import { Courses } from './components/courses/Courses'
import UserSignIn from './components/users/UserSignIn'
import UserSignUp from './components/users/UserSignUp'
import { CourseDetail } from './components/courses/CourseDetail'
import CreateCourse from './components/courses/CreateCourse'
import UpdateCourse from './components/courses/UpdateCourse'
import PrivateRoute from './PrivateRoute'
import UserSignOut from './components/users/UserSignOut'
import { reduxConnnect } from './redux/reduxHOC'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Courses} />
        <PrivateRoute path='/courses/create' component={CreateCourse} />
        <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/forbidden' component={Forbidden} />
        <Route path='/error' component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
export default App

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
