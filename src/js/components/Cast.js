import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import TextDisperse from "./TextDisperse"
import { addBreakpoints } from "./Breakpoint"
import DelayChain from "../lib/DelayChain"
import classNames from "classnames"
import { Scrollbars } from 'react-custom-scrollbars';
import Slider from "react-slick"

const castData = [
	{
		name: "Tom Cruise",
		character: "Barry Seal"
	},

	{
		name: "Jesse Plemons",
		character: "Lucy Seal"
	},

	{
		name: "Jayma Mays",
		character: "Dana Sibota"
	},

	{
		name: "Domhall Gleeson",
		character: "Monty Schafer"
	},

	{
		name: "Sarah Wright",
		character: "Lucy Seal"
	},

	{
		name: "Connor Trinneer",
		character: "George W. Bush"
	},

	{
		name: "Benito Martinez",
		character: "James Rangel"
	}


]

const crewData = [
	{
		name: "Ryan Ahrens",
		role: "Co-executive producer"
	},

	{
		name: "Brandt Andersen",
		role: "Executive producer"
	},

	{
		name: "Ray Angelic",
		role: "Executive producer"
	},

	{
		name: "Michael Bassick",
		role: "Executive producer"
	},
	{
		name: "Jean-Luc De Fanti",
		role: "Executive producer"
	},
	{
		name: "Terry Dougas",
		role: "Executive producer"
	},
	{
		name: "Michael Finley",
		role: "Executive producer"
	},

	{
		name: "Brian Grazer",
		role: "Producer"
	},

]


Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    value: function(chunkSize) {
        var array=this;
        return [].concat.apply([],
            array.map(function(elem,i) {
                return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
            })
        );
    }
});


class Cast extends Component {


	static defaultProps = {
		cast: castData,
		crew: crewData
	}

	constructor(props) {
		super(props);
		this.state = {
			animationStep: "intro-start",
			showScrollFade: false
		}
		this.dc = new DelayChain();
	}

	componentDidMount() {
		this.dc.delay(200, ()=> {
			this.setState({
				animationStep: "intro-active"
			})
		}).delay(1200, () => {
			this.setState({
				animationStep: "normal"
			})
		})
	}

	onWheel = (e) => {
		e.stopPropagation();
	}

	onScrollCast = (v) => {
		const { showScrollFade } = this.state;
		if (v.top > 0 && !showScrollFade) {
			this.setState({
				showScrollFade: true
			})
		}
		else if (showScrollFade && v.top === 0) {
			this.setState({
				showScrollFade: false
			})
		}
	}


	renderCastList() {
		const { cast, crew } = this.props;
		const { animationStep } = this.state;
		return (
			<div className="cast-content">
				{
					cast.map((c, index) => {
						const delay = index*0.5;
						return (
							<div className="cast-item" key={index}>
								<TextDisperse 
									className="text-effect-type cast-item__name" 
									duration={0.6}
									delay={delay}
									isRandom={false} 
									isActive={animationStep==="intro-start"} 
									text={c.name}
								/> 
								<div className="cast-connector" style={{animationDelay:(delay + 1.3) + "s"}}>
								</div>
								<div className="cast-character" style={{animationDelay:(delay + 1.7) + "s"}}>
									{ c.character }
								</div>
							</div>
						)
					})
				}
				<div className="cast-spacer"></div>
				{
					crew.map((c, index) => {
						const delay = index*0.5;
						return (
							<div className="cast-item" key={index}>
								<TextDisperse 
									className="text-effect-type cast-item__name" 
									duration={0.6}
									delay={delay}
									isRandom={false} 
									isActive={animationStep==="intro-start"} 
									text={c.name}
								/> 
								<div className="cast-connector" style={{animationDelay:(delay + 1.3) + "s"}}>
								</div>
								<div className="cast-character" style={{animationDelay:(delay + 1.7) + "s"}}>
									{ c.role }
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}

	next = () => {
		this.slider.slickNext();
	}

	previous = () => {
    this.slider.slickPrev()
  }


	renderVerticalScroll() {
		return (
			<Scrollbars 
				style={{ height: 330 }}
				renderThumbVertical={props => <div {...props} className="cast-scrollbar"></div> }
				renderTrackVertical={props => <div {...props} style={{position: "absolute", width: "4px"}} className="cast-scrolltrack"></div> }
				onUpdate={this.onScrollCast}
				className="cast-scroll-container"
				onWheel={this.onWheel}
				ref={(el) => { this.scrollBars = el; }}
			>
				{this.renderCastList()}
			</Scrollbars>
		)
	}

	renderHorizontalScroll() {
		const { cast, crew } = this.props;

		let castGroups = cast.chunk_inefficient(4);
		let crewGroups = crew.chunk_inefficient(4);

		const Arrow = (props) => {
			return (
				<div className={"cast-arrow-" + props.type + " " + props.className} onClick={props.onClick}>



				</div>
			)
		}

		let sliderSettings = {
			infinite: false,
			arrows: false,
			nextArrow: <Arrow type="next" {...this.props} />,
			prevArrow: <Arrow type="prev" {...this.props} />,
			adaptiveHeight: true
			
		}

		return (
			<div>
				<Slider {...sliderSettings} onWheel={this.onWheel} ref={c => this.slider = c } >
					{
						castGroups.map((group, index) => {
							return (
								<div key={"cast-" + index}>
									{
										group.map((item, index) => {
											return (
												<div className="cast-item" key={index}>
													<div className="cast-item__name">{item.name}</div>
													<div className="cast-connector">
													</div>
													<div className="cast-character">
														{ item.character }
													</div>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
					{
						crewGroups.map((group, index) => {
							return (
								<div key={"crew-" + index}>
									{
										group.map((item, index) => {
											return (
												<div className="cast-item" key={index}>
													<div className="cast-item__name">{item.name}</div>
													<div className="cast-connector">
													</div>
													<div className="cast-character">
														{ item.role }
													</div>
												</div>
											)
										})
									}
								</div>
							)
						})
					}

				</Slider>
				<div className="cast-arrows">
					<div className={"cast-arrow-prev"}onClick={this.previous}></div>				
					<div className={"cast-arrow-next"} onClick={this.next}></div>
				</div>
			</div>
		)
	}

	render() {
			const { match, cast, crew, breakpoint } = this.props;
			const { animationStep } = this.state;

			return (
				<div className="cast">
					<div className="main-content__wrapper">
						<div className="main-content">
							<div className="page-content">
								<div className="about-section">
									<div className="cast-heading">
										Cast & Crew
									</div>
									{
										breakpoint === "small" ?
											this.renderHorizontalScroll()
										:
											this.renderVerticalScroll()
									}
								</div>
							</div>
						</div>
					</div>
				</div>
		)
	}
}


export default addBreakpoints(Cast, {
	breakpoints: {
		990: 'small',
		default: 'big'
	},
	classPrefix: "bp"
})



/*<Breakpoint points={[1300: "lg", 800: "md"]} classPrefix="breakpoint">*/







