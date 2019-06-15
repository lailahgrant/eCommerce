import React, { Component } from 'react';

//pass data from data.js - we pass the 2 variables in that file
import {storeProducts, detailProduct} from './data'


//renamed from context to ProductProvider(any name) - this is going to be the api
//context api,,comes with react so we dont install anything

//create variable to hold a context object
const ProductContext = React.createContext();
//context object comes with 2 components ie provider, consumer
//provider gives information for all appn
//consumer helps to use the info the provider is going to provide
//we dont access the info using state, we just acccess the info directly

{/*in the return() object.component that come with context (create a provider)*/}
        {/*inorder to use the value the provider has -use special prop whose name is value 
        value= can be equated to an object not only strings*/}
        {/*this - class based component. children-return all children in the Provider component  */}


class ProductProvider extends Component {

    //create state, set a property products:variable thats imported
    state={
       products: storeProducts, 
        /* products : [],
        detailProduct:detailProduct */
    };

   

    //craete a fn
    handleDetail = () =>{
        console.log("hello form details");
    };
    addToCart = () =>{
        console.log("Hello from cart");
    };
    
  render() {
    return (
        
      <ProductContext.Provider value={{
//destructure ...
...this.state,
handleDetail:this.handleDetail,
addToCart:this.addToCart
      }}>
           {this.props.children}
      </ProductContext.Provider>


    );
  }
}

//create a consumer
const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer}; //export the components individually

//Provider is placed so high since its going to be used by the whole app
//place it in the index.js, wrap the whole router in ProductProvider