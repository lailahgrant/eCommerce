import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'


import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//place ProductProvider at the top most part of the appn
import {ProductProvider} from './context'

ReactDOM.render(
    <ProductProvider>
    <Router>
    <App />
    </Router>
    </ProductProvider>
    , 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
