import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
/*  import {storeProducts} from '../data' */ //storeProducts is the name of the array in data.js

//to use the data, use consumer
import {ProductConsumer} from '../context'

export default class ProductList extends Component {

  /*  state={
    products:storeProducts
  };  */

  render() {
/* console.log(this.state.products); */

    return (

       <React.Fragment>
         <div className="py-5">
          <div className="container">
          <Title name="our" title="products" />
        <div className="row">
        <ProductConsumer>
          {/*data isnt passes in a prop, its passed in a function -- data is the eg value in the provider*/}
{/*value passed in the function is got from the Provider in the context.js */}
          {value=>{
                {/* return<h1>{value}</h1>   for strings*/}

                {/*for the objects console.log(value);*/}

 {/* loop through the array and return the product */}
  {/* we a avoiding the .state and we are acccessing the value directly */}
  {/* make a call back fn, specifiy what we want to do with ever product
  return <Product /> got from Product.js & set property of the product & grab
   all info thats in the specific array */}
          return value.products.map(product =>{
            return <Product key={product.id}  product={product}/>;
          });               
          }}

{/* the above <Pr... /> produces whats in the Product.js but times the number
 of items i the array(7 objects in the array) */}

        </ProductConsumer>
        </div>

          </div>
         </div>
       </React.Fragment>

    // <Product />
    );
  }
}
