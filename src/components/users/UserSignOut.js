import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/Slices/auth'

const UserSignOut = () => {
  const dispatch = useDispatch()
  dispatch(signOut())
  return <Redirect to="/" />;
};

export default UserSignOut
