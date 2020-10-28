import SHOP_DATA from './shop.data';

const INITIAL_STATE = {
  collections: SHOP_DATA
};

// for now shopReducer just puts the shop data in the state, and we never make
// any changes to the data so there aren't any real actions -- just return state
const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default shopReducer;