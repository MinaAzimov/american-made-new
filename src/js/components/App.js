import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Page from './Page'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import classNames from "classnames"

export default class App extends Component {

	render() {
		const classnames = classNames({
			'app-container' : true
		})
		return (

			<div className={classnames}>
				<Router>
					<Route component={Page} />
				</Router>
			</div>
		)
	}
}