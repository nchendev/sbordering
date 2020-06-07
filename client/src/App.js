import React, { useState, useEffect, Fragment } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import Menu from './components/Menu.js';
import Order from './components/Order.js';
import Information from './components/Information.js';
import Confirmation from './components/Confirmation.js';
import OrderDetails from './components/OrderDetails';
import OrderOptions from './components/OrderOptions';
import Login from './components/Login';
import OrderSystem from './components/OrderSystem';
import Register from './components/Register';
import Link from '@material-ui/core/Link';

import './App.css';

import 'typeface-roboto';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://szechuanbistro.com'>
				Szechuan Bistro
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
function App() {
	//const classes = useStyles();

	return (
		<Router>
			<Switch>
				<Route
					path='/ordersystem'
					component={OrderSystem}
					Copyright={Copyright}
				/>
				<Route path='/register' component={Register} Copyright={Copyright} />
				<Route path='/' component={Login} Copyright={Copyright} />
			</Switch>
		</Router>
	);
}

export default App;
