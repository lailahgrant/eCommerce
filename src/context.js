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
       /* products: storeProducts,  */
        products : [],
        detailProduct:detailProduct,
        /* cart : storeProducts, */
        cart : [],
        
        /* set up modals */ 
        modalOpen : false,
        modalProduct : detailProduct,
        /* cart  */
        cartSubTotal: 0,
        cartTax :0,
        cartTotal : 0
    };


    
 /*3 */
    componentDidMount(){
      this.setProducts();
    }

    setProducts = () =>{
      let tempProducts=[];
      /* 1 - loop through the array in storeProduct variable in data.js */
      storeProducts.forEach(item =>{
        const singleItem = {...item};
        tempProducts = [...tempProducts, singleItem];
      });
      /* setstate -2 */
      this.setState(() =>{
        return {products:tempProducts}
      });

    }
   
    /* utility method that gets id & its for reusability */
    getItem = (id) => {
      const product = this.state.products.find(item =>item.id === id);
      return product;
    }

    //craete a fn
    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(() =>{
          return {detailProduct:product}
        })
    };
    addToCart = (id) =>{
      let tempProducts = [...this.state.products];
      /*  */
      const index = tempProducts.indexOf(this.getItem(id));

      const product = tempProducts[index];

      product.inCart = true;
      product.count = 1;

      const price = product.price;
      product.total = price;

      this.setState(() => {
  return {products : tempProducts, cart: [...this.state.cart, product]};
      }, 
      /* add the totals fn in this call back fn of addToCart */
      () => {/* console.log(this.state); */

        this.addTotals();
      });
    };
    

    /* modal fns 2 fns */
    openModal = id =>{
      const product = this.getItem(id);
      this.setState(() => {
        return{modalProduct : product, modalOpen : true}
      });
    };

    closeModal = () =>{
      this.setState(() => {
        return {modalOpen : false}
      });
    };

  /* cart methods */
    increment = (id) =>{
      /* get cart items from the state */
      let tempCart = [...this.state.cart];
      const selectedProduct = tempCart.find(item => item.id === id);

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      /* quantity is controlled by count */
      product.count = product.count +1;
      product.total = product.count * product.price;

      
      this.setState(() => {return{cart: [...tempCart]}}, 
      /* call back fn passed] */
      ()=> {this.addTotals()})

    };

    decrement = (id) =>{
      /* get cart items from the state */
      let tempCart = [...this.state.cart];
      const selectedProduct = tempCart.find(item => item.id === id);

      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];

      /* quantity is controlled by count */
      product.count = product.count - 1;

      if(product.count === 0){
        this.removeItem(id)
      }else{
        product.total = product.count * product.price;

      
      this.setState(() => {return{cart: [...tempCart]}}, 
      /* call back fn passed] */
      ()=> {this.addTotals()})

      }
    }

    removeItem = (id) =>{
      /* work with the id */
      /* create 2 temporary arrays */
      let tempProducts = [...this.state.products]; /* detructure the array */
      let tempCart =[...this.state.cart];
      
      /* filter the cart and return only the items that dont have id(id dont exist) */
      tempCart = tempCart.filter(item => item.id !== id);

      const index = tempProducts.indexOf(this.getItem(id));
      let removedProduct = tempProducts[index];
      /* since removing product, removed it from the cart..
      set the inCart to false, count to 0, total to 0 */
      removedProduct.inCart =false;
      removedProduct.total = 0;
      removedProduct.count = 0;

      this.setState(() => {
        return {
          cart: [...tempCart],
          products : [...tempProducts]
        }
      },
      /* call back fn */
      () => {
        this.addTotals();
      }
      );
    };

    /* in this, we should set the incart back to cart where someone can buy ie to default values */
    clearCart = () =>{
      this.setState(() =>{
        return {cart :[]};/* pass an empty array */
      }, () => {
        /* call back function, set the incart to cart icon where one can buy ie default value */
      this.setProducts(); /* new fresh original default values */
      this.addTotals(); /* update the totals to default */
    });
    };

    /* totals */
    /* we call this fn, in the addToCart fn's call back fn - since, items are in the cart*/
    addTotals = () =>{
      let subTotal = 0;
      /* mapping throu the cart, go through the array(all item in the cart) in addToCart fn*/
      this.state.cart.map(item => {subTotal += item.total});
      const tempTax = subTotal*0.1;/* if tax is 10/100 */
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax
      this.setState(() => {
        return{
          cartSubTotal : subTotal,
          cartTax : tax,
          cartTotal : total
        }
      })
    }

  render() {
    return (
        
      <ProductContext.Provider value={{
//destructure ...
...this.state,
handleDetail:this.handleDetail,
addToCart:this.addToCart,
openModal:this.openModal,
closeModal : this.closeModal,
increment : this.increment,
decrement : this.decrement,
removeItem : this.removeItem,
clearCart : this.clearCart

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