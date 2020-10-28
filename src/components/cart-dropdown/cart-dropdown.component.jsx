import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

// though there's only one prop on props, cartItems, destructure it anyway
// we get history from browserRouter in index.js by wrapping the component returned from connect with withRouter
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length ?
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
          :
          <span className='empty-message'>Your cart is empty</span>
      }
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout');
      // dispatch shorthand: use the dispatch() passed in as a prop by connect()
      // to toggle cart to hidden when we click on GO TO CHECKOUT button
      dispatch(toggleCartHidden());
    }}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

// switch this version of mapStateToProps with one that uses the selectCartItems
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15163032#questions/12154690
// does not think it is necessary for this component
// selector (NOT selectCartItemsCount), avoid re-render
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   cartItems
// });

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state)
// });

// go to using createStructuredSelector
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// use shorthand for dispatching toggleCartHidden when user clicks GO TO CHECKOUT -- see below
// const mapDispatchToProps = dispatch => ({
//   toggleCartHidden: ()=> dispatch(toggleCartHidden())
// })

// dispatch shorthand: an alternative to writing out a mapDispatchToProps
// if we don't provide a mapDispatchToProps function as a second arg to connect,
// connect will pass dispatch() to our component as a prop,
// where we can use it for one-off action dispatches -- see above
export default withRouter(connect(mapStateToProps)(CartDropdown));