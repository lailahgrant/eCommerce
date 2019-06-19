import React, { Component } from 'react'

import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {ButtonContainer} from './Button'
/*   */

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value =>{
          {/* console.log(value.detailProduct); */}
          const {id,company,img,description,title,price,inCart} =  value.detailProduct;

          return(
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end of title */}

              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                <img src={img} className="img-fluid" alt="pants" />
                </div>

                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model : {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by :
                  <span className="text-uppercase">{company}</span></h4>
                  <h4 className="text-blue">
                    <strong>price : <span>$</span>
                    {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product
                  </p>
                  <p className="text-muted lead">{description}</p>

                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>

{/* styled components, we can pass props to update css os a givencomponent 
cart -prop name we atach*/}
                    <ButtonContainer cart disabled={inCart ? true:false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                   }}>
                      {inCart ? "inCart" : "add to cart"}
                    </ButtonContainer>
                  </div>

                </div>
              </div>

            </div>
          )

        }}
      </ProductConsumer>
    );
  }
}
