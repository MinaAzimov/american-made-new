import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import TextDisperse from "./TextDisperse"
import DelayChain from "../lib/DelayChain"
import CountdownTimer from "./CountdownTimer"
import classNames from "classnames"

export default class ComingSoon extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animationStep: "intro-start"
		}
		this.dc = new DelayChain();
	}

	componentDidMount() {
		this.dc.delay(500, ()=> {
			this.setState({
				animationStep: "intro-active"
			})
		}).delay(1200, () => {
			this.setState({
				animationStep: "normal"
			})
		})
	}

	render() {
			const { match } = this.props;
			const { animationStep } = this.state;
			return (
				<div className="coming-soon">
					<div className="main-content__wrapper">
						<div className="main-content">
							<div className="page-content">
								<div className="page-content-heading">
									Coming soon
								</div>
								<div>
									<CountdownTimer />
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}