


import React, { Component, PropTypes } from 'react';
import classNames from "classnames"
import { shuffle } from "lodash"

export default class TextDisperse extends Component {

	static propTypes = {
		text: PropTypes.string,
		className: PropTypes.string,
		isActive: PropTypes.bool,
		duration: PropTypes.number,
		delay: PropTypes.number,
		isRandom: PropTypes.bool
	}

	static defaultProps = {
		duration: 2.5,
		delay: 0,
		isRandom: false
	}

	constructor(props) {
		super(props);
	}



	renderText() {

		const { text, isActive, duration, isRandom, delay } = this.props;
		const elements = [];

		const interval = duration / text.length;
		let intervals = Array.apply(null, {length: text.length}).map((d, i) => { return i * interval });
		if (isRandom) {
			intervals = shuffle(intervals)
		}

		for (let i = 0; i < text.length; i++) {

			let c = text[i];
			if (c === ' ') {
				elements.push(<span key={i} className="text-disperse-char-blank">{' '}</span>);
			}
			else {
				let style = (isActive) ? {
					transitionDelay: delay + intervals[i] + "s",
				}
				:
				{
					transitionDelay: 0,
				}

				let e = <span className="text-disperse-char" key={i} style={style}>{c}</span>
				elements.push(e);
			}

		}

		return elements;
	}


	render() {

		const { text, isActive, className } = this.props;
		const classnames = classNames({
			"text-effect": true,
			"text-effect--active": isActive
		}, className)

		return (
			<div className={classnames}>
				{ this.renderText() }
			</div>
		)
	}
}