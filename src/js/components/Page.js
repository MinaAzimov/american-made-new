import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Footer from './Footer'
import Cloud from "./Cloud"
import CloudTrailer from "./CloudTrailer"
import About from './About'
import Home from './Home'
import ComingSoon from './ComingSoon'
import Nav from './Nav'
import MobileNav from './MobileNav'
import Header from './Header'
import Cast from './Cast'
import Trailer from './Trailer'
import DelayChain from "../lib/DelayChain"
import TextDisperse from "./TextDisperse"

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Route, IndexRoute, Switch, Redirect} from "react-router-dom";
import { browserHistory } from 'react-router';
import classNames from "classnames"
import { addBreakpoints } from "./Breakpoint"




const routeOrder = [
	"/",
	"/about",
	"/cast",
	"/trailer",
	"/comingsoon"
]

const routes = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/about",
		component: About
	},
	{
		path: "/cast",
		component: Cast
	},
	{
		path: "/trailer",
		component: Trailer
	},
	{
		path: "/comingsoon",
		component: ComingSoon
	},
]




class Page extends Component {

	static defaultProps = {
		routeOrder: routeOrder,
	}



	constructor(props) {
		super(props);
		this.state = {
			transitioning: false,
			transitionDirection: "down",
			active: false
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



    open = () => {
		this.setState({
			active: !this.state.active
			
		})
		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*'); 
		this.refs.vidRef1.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
	}

	close = () => {
		this.setState({
			active: false

		})
		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*'); 
	}


    play = () => {
		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');    
	}


	pause = () => {
		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*'); 
	}


	mute = () => {


		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'mute' + '","args":""}', '*');
		
	}

	unmute = () => {


		this.refs.vidRef.contentWindow.postMessage('{"event":"command","func":"' + 'unMute' + '","args":""}', '*');
		console.log(this.refs);
	}


	onWheel = (e) => {

		if (!this.state.transitioning) {

			const url = this.props.location.pathname;
			const currIndex = this.props.routeOrder.indexOf(url);

			if (e.deltaY > 0) {
				let newUrl = this.props.routeOrder[currIndex + 1];
				this.props.history.push(newUrl);
			}
			else if (e.deltaY < 0) {
				let newUrl = this.props.routeOrder[currIndex - 1];
				this.props.history.push(newUrl);
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location !== nextProps.location) {

			let currIndex = this.props.routeOrder.indexOf(this.props.location.pathname);
			let nextIndex = this.props.routeOrder.indexOf(nextProps.location.pathname);
			let transitionDirection = (nextIndex > currIndex) ? "down" : "up";


			if (!this.state.transitioning) {
				this.setState({
					transitioning: true,
					transitionDirection: transitionDirection
				});
				setTimeout(() => {
					this.setState({
						transitioning: false
					});
				}, 1300);
			}
		}
	}


	render() {
   
		let {active} = this.state;
   		let classes = classNames('specialbutton' + active);
   		let classes1 = classNames('iframe' + active);
		console.log("PROPRRR", this.props);
		const { location, breakpoint } = this.props;
		const url = location.pathname;
		const currIndex = this.props.routeOrder.indexOf(url);
		const PageComponent = routes[currIndex].component;


		const { transitioning, transitionDirection } = this.state;

		const classnames = classNames({
				'page' : true
			}, 
			'page-' + active,
			"page--" + location.pathname.slice(1),
			'page--transition-direction-' + transitionDirection,

		)
		return (
			<div className={classnames} onWheel={this.onWheel}>
				<div className="cloud-bg">
				</div>

           {
		  		 url !== "/"   ? 

					<Header />				
		  		:
		  		null		
		  	}

				
				<MobileNav location={location.pathname} />
				<Nav />



			{

					(breakpoint !== "small" && url === "/")   ? 
						<div className="alex-wrapper">
        				<div className={classes} onClick={this.open}>
        				<div id="trailer-label"><h1>Watch Trailer</h1></div>
						 <button>Click me</button>
        

                        <video ref="vidRef1" autoPlay loop allowFullScreen>
                        <source src="../assets/video/video1.mp4" />
               
                        </video>

                        </div>

                        <div className="largeframe-wrapper">
                        <button className={classes1}  id="closeButton" onClick={this.close}></button>
                        <button  className={classes1} id="playButton" onClick={this.play}></button>
                        <button  className={classes1} id="stopButton" onClick={this.pause}></button>
                    	<button  className={classes1} id="muteButton" onClick={this.mute}></button>
                    	<button  className={classes1} id="unmuteButton" onClick={this.unmute}></button>
                        <iframe ref="vidRef" className={classes1} src="//www.youtube.com/embed/vIu85WQTPRc?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0&playsinline=1&autoplay=0&showinfo=0&autohide=1&controls=0&modestbranding=1&vol=0"  frameBorder="0"
                        allowFullScreen></iframe> 
                        </div>
						</div>
						
					:
					null
		  
			}
				<ReactCSSTransitionGroup 
					transitionName="page-change" 
					transitionEnterTimeout={1200} 
					transitionLeaveTimeout={1200}>
					<div className={"page-wrapper"}  key={location.pathname}>
                    <Route exact path="/" component={ Home } location={location} />
		  			<Route exact path="/about" component={ About } location={location} />
		  			<Route exact path="/cast" component={ Cast } location={location} />
		  			<Route exact path="/trailer" component={ Trailer } location={location} />
		  			<Route exact path="/comingsoon" component={ ComingSoon } location={location}/>	
		  		</div>
		  	</ReactCSSTransitionGroup>



		  	{

		  		(breakpoint !== "small" && url !== "/trailer")   ? 
	
						<div className="cloud-wrapper">
							<Cloud id={1} />
							<Cloud id={2} />
							<Cloud id={3} />
							<Cloud id={4} />
							<Cloud id={5} />
							<Cloud id={6} />
						</div>		  			
		  		:
		  		<div className="cloudtrailer-wrapper">
							<CloudTrailer id={1} />
							<CloudTrailer id={2} />
							<CloudTrailer id={3} />
							<CloudTrailer id={4} />
							<CloudTrailer id={5} />
							<CloudTrailer id={6} />
						</div>	


		  	}

				<Footer />
			</div>
		)
	}
}

export default addBreakpoints(Page, {
	breakpoints: {
		800: "small"
	}

});