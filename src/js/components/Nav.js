import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"
import {
  NavLink
} from 'react-router-dom'

export default class Home extends Component {

	render() {
		return (
			<div className="nav">
				<div className="nav-inner">
					<div className="nav-list">
						<NavItem to="/" />
						
					</div>
				</div>
			</div>
		)
	}
}



class NavItem extends Component {


	render () {
		const {to} = this.props;
		return (

		<div>
				<NavLink to="/" activeClassName="nav-link-active" exact={true} >
					<p className="label success new-label"><span className="align">Home</span></p>
				</NavLink>

				<NavLink to="/about" activeClassName="nav-link-active" exact={true} >
				<p className="label1 success1 new-label1"><span className="align1">About</span></p>
				</NavLink>

				<NavLink to="/cast" activeClassName="nav-link-active" exact={true} >
				<p className="label2 success2 new-label2"><span className="align2">Cast</span></p>
				</NavLink>

				<NavLink to="/trailer" activeClassName="nav-link-active" exact={true} >
				<p className="label3 success3 new-label3"><span className="align3">Trailer</span></p>
				</NavLink>

				<NavLink to="/comingsoon" activeClassName="nav-link-active" exact={true} >
				<p className="label4 success4 new-label4"><span className="align4">Coming Soon</span></p>
				</NavLink>


				
					
			</div>		
					
		)
	}

}