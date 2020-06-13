// import React, { useState } from 'react';
// import Data from './Data';
// import Cookies from 'js-cookie';
// const Context = React.createContext();

// export const Provider = ({ children }) => {
//   const data = new Data();
//   // storing cookies in state
//   const [ authUser, setAuthedUser] = useState(Cookies.getJSON('authedUser') || null)
//   const [password, setPassword] = useState(Cookies.get('password') || null)


//     const value = {
//       authedUser,
//       password,

//       data: this.data,
//       actions: {
//         signIn: this.signIn,
//         signOut: this.signOut,
//       },
//     };

//     return (
//       <Context.Provider value={value}>{this.props.children}</Context.Provider>
//     );
  
// }
//   // signs in user and sets auth user and password in cookies.
//   signIn = async (email, password) => {
//     const user = await this.data.getUser(email, password);
//     if (user !== null) {
//       this.setState(() => {
//         return {
//           authedUser: user,
//           password,
//         };
//       });
//       Cookies.set('authedUser', JSON.stringify(user), { expires: 7 });
//       Cookies.set('password', password);
//     }
//     return user;
//   };
//   // signs out user and removes cookies
//   signOut = () => {
//     this.setState({ authedUser: null });
//     Cookies.remove('authedUser');
//     Cookies.remove('password');
//     console.log(`Logout Successful`);
//   };


// export const Consumer = Context.Consumer;

// /**
//  * A higher-order component that wraps the provided component in a Context Consumer component.
//  * @param {class} Component - A React component.
//  * @returns {function} A higher-order component.
//  */

// export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   };
// }
