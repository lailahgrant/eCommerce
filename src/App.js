import React,{Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
import ProductList from './components/ProductList'
import Details from './components/Details'

import Default from './components/Default'

import Modal from './components/Modal'  

import Zoho from './components/Zoho'

//package.json in the Cart folder is formed to make Cart.js as the main file
//its done to avoid import Cart from './components/Cart/Cart'
import Cart from './components/Cart'

 class App extends Component {
  render() {
    return (
      <React.Fragment>
      <Navbar />  

      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/zohoverify/verifyforzoho.html" component={Zoho} />
        <Route  component={Default} />
      </Switch>
        
        {/* modal is out of the swich since no routing is set to he routet*/}
        <Modal />

      </React.Fragment>
    )
  }
}


export default App;
