import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import Page from "./Page"
import CloudTrailer from "./CloudTrailer"
import TextDisperse from "./TextDisperse"
import DelayChain from "../lib/DelayChain"
import classNames from "classnames"

export default class Trailer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animationStep: "intro-start",
			path: "../assets/video/video.mp4"
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
			const { path } = this.state;

			console.log("The about props", this.props);

			return (
                 <div className="trailer">
					
								<div className="trailer-content">

			 <iframe className="video-frame" src="//www.youtube.com/embed/vIu85WQTPRc?enablejsapi=1&version=3&playerapiid=ytplayer&rel=0&playsinline=1&autoplay=1&showinfo=0&autohide=1&controls=0&modestbranding=1&vol=0"  frameBorder="0"
                        allowFullScreen></iframe> 

            <video className="video-frame-countdown" autoPlay allowFullScreen>
                <source src="../assets/video/count.mp4"/>
               
           </video>
							
					</div>
				</div>


		)
	}
}