import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import classNames from "classnames"

export default class CloudTrailer extends Component {

	static propTypes = {
		className: PropTypes.string,
		animation: PropTypes.string,
		imgSrc: PropTypes.string
	}

	render() {
		
		const classnames = classNames({
			'cloudtrailer' : true
		}, 'cloudtrailer-' + this.props.id);
		return (
			<div className={classnames}>
				<img src={"assets/img/cloudtrailer0" + this.props.id + ".png"} />
			</div>
		)
	}
}