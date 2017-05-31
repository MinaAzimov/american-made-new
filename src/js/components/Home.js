import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"
import TextDisperse from "./TextDisperse"
import DelayChain from "../lib/DelayChain"
import CountdownTimer from "./CountdownTimer"
import {Route, IndexRoute, Switch} from "react-router-dom";
import { browserHistory } from 'react-router';
import YouTube from "react-youtube"




export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		animationStep: "intro-start",
		
		}
		this.dc = new DelayChain();
		
		
	}







	componentDidMount() {
		this.dc.delay(3000, ()=> {
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


	 
		
		const {animationStep} = this.state;
	
		const classnames = classNames({
			"home": true,
			"home--entered": !(this.state.animationStep === "intro-start")
		})
		return (



			<div className={classnames}>
				<div className="main-content__wrapper">
					<div className="main-content">
						<div className="home-content">

						    <div className="home-date-tom">
								<TextDisperse 
									duration={1.2} 
									delay={1.8}
									className="text-effect-blur" 
									id="toms-name"
									isActive={animationStep==="intro-start"} 
									isRandom={false}
									text="TOM CRUISE" 
								/>
								</div>	

							<div className="home-title">

								{/*<TextDisperse 
									duration={2} 
									className="text-effect-blur" 
									isActive={animationStep==="intro-start"} 
									isRandom={true}
									text="American Made" 

								/> */}
								   
								<span className="text">AMERICAN MAD&</span>
							{/*<TextDisperse duration={2} className="text-effect-blur-ring" isActive={animationStep==="intro-start"} text="American Made"/>  */}
							</div>

							<div className="home-date-based">
								<TextDisperse 
									duration={1.2} 
									delay={1.8}
									className="text-effect-blur" 
									isActive={animationStep==="intro-start"} 
									isRandom={false}
									text="BASED ON A TRUE LIE" 
								/>
								</div>
							<div className="home-date">
								<TextDisperse 
									duration={1.2} 
									delay={1.8}
									className="text-effect-blur" 
									isActive={animationStep==="intro-start"} 
									isRandom={false}
									text="September 27, 2017" 
								/>
							</div>

						

						
						
						</div>
					</div>
				</div>

				<div className="home-bottom">
					<div className="home-separator">
					</div>
					<div className="home-arrow">
						<i className="fa fa-angle-down"></i>
					</div>
				</div>

			</div>
		)
	}
}