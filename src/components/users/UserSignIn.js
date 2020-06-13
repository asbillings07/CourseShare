import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../redux/Slices/auth'

const UserSignIn = ({ history, location }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, userSignedIn, authedUser, errors } = useSelector(state => state.authSlice)
  console.log({ loading, userSignedIn, authedUser, errors })
  const dispatch = useDispatch()

  const { from } = location.state || {
    from: { pathname: '/' },
  };

  useEffect(() => {
    if (userSignedIn) {
      history.push(from)
    }
  }, [userSignedIn])

  

  const submit = () => dispatch(signIn(email, password))
  
  const cancel = () => history.push('/')

  if (userSignedIn) return <Link to='/' />

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );


 
}

export default UserSignIn