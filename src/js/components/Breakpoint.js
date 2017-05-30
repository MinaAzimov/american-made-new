
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from 'classnames'


const initialSettings = {
	breakpoints: {},
	classPrefix: 'bp'
}

function compareNumbers(a, b) {
  return a - b;
}

export function addBreakpoints(Component, settings = {}) {

	settings = Object.assign({}, initialSettings, settings);
	
	const bpWidths = Object.keys(settings.breakpoints)
	.filter(v => v !== 'default')
	.map(v => parseInt(v)).sort(compareNumbers);

	const defaultBp = settings.breakpoints['default'] ? settings.breakpoints['default'] : 'default';

	return class Breakpoint extends Component {

		constructor(props) {
			super(props);
			this.state = {
				currentBp: null
			}
		}

		componentDidMount() {
			this.updateBreakpoints();
			window.addEventListener("resize", this.onResize);
		}

		componentWillUnmount() {
			window.removeEventListener("resize", this.onResize);
		}

		onResize = () => {
			this.updateBreakpoints();
		}


		updateBreakpoints() {
			
			let width = this.element.offsetWidth;
			let bp = defaultBp;
			
			for (let i = 0; i < bpWidths.length; i++) {
				let bpWidth = bpWidths[i];
				if (width <= bpWidth) {
					bp = settings.breakpoints[bpWidth];
					break;
				}
			}

			if (bp !== this.state.currentBp) {
				this.setState({
					currentBp: bp
				});						
			}
		}

		render() {

			const { classPrefix } = settings;
			const { currentBp } = this.state;
			const classname = classPrefix + "-" + currentBp

			return (
				<div className={classname}  ref={el => {this.element = el}}>
					{
						currentBp !== null ?
							<Component {...this.props} breakpoint={currentBp} />
						:
							null
					}
				</div>
			)
		}
	}
}