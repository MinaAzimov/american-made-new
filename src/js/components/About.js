import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Page from "./Page"
import Cloud from "./Cloud"
import TextDisperse from "./TextDisperse"
import DelayChain from "../lib/DelayChain"
import classNames from "classnames"

export default class About extends Component {

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

			console.log("The about props", this.props);

			return (
				<div className="about">
					<div className="main-content__wrapper">
						<div className="main-content">
							<div className="page-content">
								<div className="about-heading">
									Based on a true lie
								</div>
								<div className="about-content">

									<TextDisperse className="text-effect-type" isRandom={false} isActive={animationStep==="intro-start"} text="American Made tells the story of Barry Seal, 
										a TWA pilot who is recruited by the CIA to help counter the emerging communist threat in Central America."
									/> 
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}