import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"
import DelayChain from "../lib/DelayChain"
import TextDisperse from "./TextDisperse"

export default class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animationStep: "intro-start"
		}
		this.dc = new DelayChain();
	}

componentDidMount() {
		this.dc.delay(3000, ()=> {
			this.setState({
				animationStep: "intro-active"
			})
		}).delay(12000, () => {
			this.setState({
				animationStep: "normal"
			})
		})
	}




	render() {
        const {animationStep} = this.state;
		const classnames = classNames({
		    'header' : true,
			"home": true,
			"home--entered": !(this.state.animationStep === "intro-start")
		})

		
		return (
			<div className={classnames}>

			<div>
								<TextDisperse 
									duration={1.9} 
									className="text-effect-spitfire" 
									isActive={animationStep==="intro-start"} 
									isRandom={false}
									text="American Made"
								/>
							</div>
			
			
				
			</div>
		)
	}
}