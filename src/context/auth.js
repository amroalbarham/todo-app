import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import base64 from 'base-64';
const API = 'https://auth-server-401.herokuapp.com';
export const AuthContext = React.createContext();


function Auth(props) {

	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = cookie.load('auth');
		validateToken(token);
	}, []);

	function validateToken(token) {
		try {
			const user = jwt.decode(token);
			if (user) setLoginState(true, token, user);
		} catch (error) {
			setLoginState(false, null, {});
			console.log(`Token Validation Error ${error.message}`);
		}
	}

	function setLoginState(loggedIn, token, user) {
		cookie.save('auth', token);
		setUser({ user });
		setLoggedIn(loggedIn);
	}

	function setLogoutState(loggedIn, user) {
		cookie.save('auth', null);
		setUser({ user });
		setLoggedIn(loggedIn);
	}

	async function login(username, password) {
		try {
			const response = await superagent
				.post(`${API}/signin`)
				.set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
			validateToken(response.body.token);
		} catch (error) {
			console.error('Signin Error', error.message);
		}
	}

	async function signup(email, username, password, role) {
		try {
			const response = await superagent.post(`${API}/signup`, {
				email,
				username,
				password,
				role,
			});

			validateToken(response.body.token);
		} catch (error) {
			console.error('Signup Error', error.message);
		}
	}

	function logout() {
		setLogoutState(false, {});
	}

	const state = {
		loggedIn,
		user,
		setLoggedIn,
		login,
		signup,
		logout,
		setUser,
	};


	return (
		<AuthContext.Provider
		value={state}
	>
		{props.children}
	</AuthContext.Provider>
	);
};

export default Auth
// export default class Auth extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loggedIn: false,
//       user: {},
//     };
//   }

//   componentDidMount() {
//     // get the token from the browser cookies
//     const token = cookie.load('auth');
//     this.validateToken(token);
//   }
//   validateToken = (token) => {
//     // dont verify in the frontend!!
//     // const user = jwt.verify(token,'secret')
//     if (token !== 'null') {
//       const user = jwt.decode(token);
//       console.log(token, user);
//       this.setLoginState(true, token, user);
//     } else {
//       this.setLoginState(false, null, {});
//     }
//   };
//   setLoginState = (loggedIn, token, user) => {
//     cookie.save('auth', token);
//     this.setState({ token, loggedIn, user });
//   };
//   login = async (username, password) => {
//     // headers{authorization: "Basic sdfsdfsdf="}
//     try {
//       const response = await superagent
//         .post(`${API}/signin`)
//         .set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
//       console.log(response.body);
//       this.validateToken(response.body.token);
//     } catch (error) {
//       console.error('LOGIN ERROR', error.message);
//     }
//   };
//   logout = () => {
//     this.setLoginState(false, null, {});
//   };
//   render() {
//     return (
//       <AuthContext.Provider
//         value={{ ...this.state, login: this.login, logout: this.logout }}
//       >
//         {this.props.children}
//       </AuthContext.Provider>
//     );
//   }
// }




