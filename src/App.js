import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import './App.css';

import 'typeface-roboto';

const useStyles = makeStyles((theme) => ({
	root: {
		direction: 'column',
		flexGrow: 1,
		justifyContent: 'space-between',
	},
	paper: {
		padding: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	margin: {
		margin: theme.spacing(1),
	},
	fab: {
		margin: 0,
		bottom: theme.spacing(1),
		left: 'auto',
		position: 'fixed',
		minWidth: '80vw',
	},
	fab2: {
		margin: 0,
		bottom: theme.spacing(1),
		left: 'auto',
		position: 'fixed',
		minWidth: '40vw',
	},
	fabSpace: {
		margin: theme.spacing(1),
		height: '40px',
	},
}));

function App() {
	const classes = useStyles();

	const [orderOptions, setOrderOptions] = React.useState({
		language: 1,
		pd: 1,
	});
	const [menu, setMenu] = React.useState({});
	const [order, setOrder] = React.useState([]);
	const [information, setInformation] = React.useState({
		name: '',
		address: '',
		phone: '',
		driverNotes: '',
		cc: '',
		exp: '',
		cvv: '',
	});
	const [step, setStep] = React.useState(1);
	const addToOrder = (orderItem) => {
		console.log(JSON.stringify(orderItem));
		setOrder([...order, orderItem]);
		console.log(JSON.stringify(order));
	};

	// Proceed to next step
	const nextStep = () => {
		setStep(step + 1);
	};

	// Go back to prev step
	const prevStep = () => {
		setStep(step - 1);
	};

	const removeFromOrder = (itemIndex) => {
		console.log(itemIndex);
		let cpy = order.slice(0);
		setOrder([...cpy.slice(0, itemIndex), ...cpy.slice(itemIndex + 1)]);
		//order.splice(itemIndex, 1);
	};

	const editInOrder = (itemIndex, amount, note) => {
		console.log('editing order');
		let cpy = order[itemIndex];
		cpy.amount = amount;
		cpy.note = note;
		setOrder([
			...order.slice(0, itemIndex),
			cpy,
			...order.slice(itemIndex + 1),
		]);
	};

	const handleInfoChange = (input) => (e) => {
		information[input] = e.target.value;
		setInformation(information);
	};

	const handleOrderOptionsChange = (input) => (e) => {
		orderOptions[input] = parseInt(e.target.value);
		setOrderOptions(orderOptions);
		console.log(orderOptions);
	};

	useEffect(() => {
		console.log('trigger use effect hook');
		axios
			.get('https://www.neckch.in/sbistro/menu.json')
			.then((res) => setMenu(res.data));
	}, []);

	const headerFrag = <Fragment></Fragment>;
	switch (step) {
		case 1:
			return (
				// pickup or delivery step
				<div className={classes.root}>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Order Options
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/* OrderOptions */}
					<OrderOptions
						orderOptions={orderOptions}
						handleOrderOptionsChange={handleOrderOptionsChange}
					/>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					<Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab)}
								onClick={nextStep}
							>
								Continue to Order
							</Fab>
						</Paper>
					</Grid>
				</div>
			);
		case 2:
			return (
				// ordering step
				<div className={classes.root}>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Menu
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/** Content **/}
					<Paper elevation={2} className={classes.paper}>
						<Menu menu={menu} addToOrder={addToOrder} />
					</Paper>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					<Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={prevStep}
							>
								Options
							</Fab>
						</Paper>
						<Paper>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={nextStep}
							>
								Review Order
							</Fab>
						</Paper>
					</Grid>
				</div>
			);
		case 3:
			return (
				// review order step
				<div className={classes.root}>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Review Order
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/* Order */}
					<Paper elevation={2} className={classes.paper}>
						<Typography
							variant='h6'
							className={(classes.title, classes.margin)}
						>
							Your Order
						</Typography>
						<Order
							order={order}
							removeFromOrder={removeFromOrder}
							editInOrder={editInOrder}
						/>
					</Paper>
					<Paper>
						<OrderDetails order={order} />
					</Paper>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					<Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={prevStep}
							>
								Add Items
							</Fab>
						</Paper>
						<Paper>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={nextStep}
							>
								Continue
							</Fab>
						</Paper>
					</Grid>
				</div>
			);
		case 4:
			return (
				// information step
				<div>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Contact and Payment Details
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/* Information */}
					<Information
						information={information}
						handleInfoChange={handleInfoChange}
					/>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					<Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={prevStep}
							>
								Review Order
							</Fab>
						</Paper>
						<Paper>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={nextStep}
							>
								Continue
							</Fab>
						</Paper>
					</Grid>
				</div>
			);
		case 5:
			return (
				// Confirm Order step
				<div className={classes.root}>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Confirm Order
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/* Confirm Order */}
					<Typography variant='h6' className={(classes.title, classes.margin)}>
						Are you sure you're ready to place your order? This is your last
						chance to make any changes!
					</Typography>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					<Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={prevStep}
							>
								Make Changes
							</Fab>
						</Paper>
						<Paper>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab2)}
								onClick={nextStep}
							>
								Send Order!
							</Fab>
						</Paper>
					</Grid>
				</div>
			);
		case 6:
			return (
				// Confirmed Step
				<div className={classes.root}>
					{/** Header**/}
					<AppBar position='fixed'>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Order Submitted
							</Typography>
						</Toolbar>
					</AppBar>
					<Toolbar />

					{/* Confirm Order */}
					<Typography variant='h6' className={(classes.title, classes.margin)}>
						Thank you for ordering from Szechuan Bistro! We will be in contact
						shortly through phone by 405-752-8889 to confirm your order!
						Deliveries should be made within the hour, and pickup orders should
						be ready in 15 minutes. <br /> Thank you for your patronage, we hope
						to serve you again soon.
					</Typography>

					{/* Fab Space */}
					<Paper elevation={0} className={classes.fabSpace} />

					{/** Navigation **/}
					{/**</div><Grid container justify='center'>
						<Paper className={classes.fab}>
							<Fab
								variant='extended'
								color='primary'
								aria-label='add'
								className={(classes.margin, classes.fab)}
								onClick=!!!
							>
								Return to Website
							</Fab>
						</Paper>
					</Grid>
					**/}
				</div>
			);
	}
}

export default App;
