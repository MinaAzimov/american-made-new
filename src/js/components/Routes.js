import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import {Route, IndexRoute, Switch} from "react-router";



export const routes = (
		<div>
  		<Route exact path="/" component={ makeWpRoute(Home, "pages", {"slug":"home-page"}) } />
  		<Route path="/about" component={ makeWpRoute(About, "pages", {"slug":"about"}) } />
	  </div>
);
