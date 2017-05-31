import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"

export default class Footer extends Component {

	render() {
		const classnames = classNames({
			'footer' : true
		})
		return (
			<div className={classnames}>
				<img className="footer-logo" src="assets/img/universallogo_blue.svg" />
				<p>
					Official movie site for American Made. Starring Tom Cruise. In theaters September 15.
				</p>

				
			</div>
		)
	}
}