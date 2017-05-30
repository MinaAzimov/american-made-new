import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import moment from "moment";

function pad(num, size) {
    var s = "000" + num;
    return s.substr(s.length-size);
}



export default class CountdownTimer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = window.setInterval(()=>{
      this.forceUpdate();
    }, 10);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {

    let grad = new Date(moment("2017-9-15"));
    let now = new Date();
    let dur = moment.duration(grad.getTime() - now.getTime());

    let days = pad(dur.days(), 2);
    let hours = pad(dur.hours(), 2);
    let minutes = pad(dur.minutes(), 2);
    let seconds = pad(dur.seconds(), 2);
    let milliseconds = pad(dur.milliseconds(), 3);

    return (
      <div ref="container">
        <div className="countdown-container">
        	<div className="countdown-figure">
        		<div className="countdown-digit">{days}</div>
        		<div className="countdown-label">days</div>
        	</div>
          <div className="countdown-separator"></div>
         	<div className="countdown-figure">
        		<div className="countdown-digit">{hours}</div>
        		<div className="countdown-label">hours</div>
        	</div>
          <div className="countdown-separator"></div>
        	<div className="countdown-figure">
        		<div className="countdown-digit">{minutes}</div>
        		<div className="countdown-label">mins</div>
        	</div>
          <div className="countdown-separator"></div>
        	<div className="countdown-figure">
        		<div className="countdown-digit">{seconds}</div>
        		<div className="countdown-label">secs</div>
        	</div>
        </div>
      </div>
    );
  }
}
