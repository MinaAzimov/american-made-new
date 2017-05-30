import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"
import Footer from './Footer'
import {
  NavLink
} from 'react-router-dom'

export default class MobileNav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	open = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	close = () => {
		this.setState({
			isOpen: false
		})
	}

	render() {

		const classnames = classNames({
			'mobile-nav': true,
			'mobile-nav--open': this.state.isOpen
		})

		return (
			<div className={classnames}>
				<div className="mobile-nav__trigger" onClick={this.open}>
					<span></span>
					<span></span>
					<span></span>
				</div>

				<div className="mobile-nav__menu">
					<div className="mobile-nav__list">
						<NavLink to="/" exact={true} activeClassName="nav-link-active" onClick={this.close}>Home</NavLink>
						<NavLink to="/about" activeClassName="nav-link-active" onClick={this.close}>About</NavLink>
						<NavLink to="/cast" activeClassName="nav-link-active" onClick={this.close}>Cast & Crew</NavLink>
						<NavLink to="/trailer" exact={true} activeClassName="nav-link-active" onClick={this.close}>Trailer</NavLink>
						<NavLink to="/comingsoon" activeClassName="nav-link-active" onClick={this.close}>Countdown</NavLink>
					</div>
					<Footer />
				</div>
			</div>
		)
	}
}
