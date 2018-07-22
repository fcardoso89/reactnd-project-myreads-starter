import React from 'react'
import ReactDOM from 'react-dom'
import App from './screens/Home/App'
import SearchScreen from './screens/Search'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/search" component={SearchScreen} />
        </Switch>
    </ BrowserRouter>
, document.getElementById('root'))
