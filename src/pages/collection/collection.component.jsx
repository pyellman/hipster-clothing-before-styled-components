import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component.jsx';

import { selectCollection } from '../../redux/shop/shop.selectors.js';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  console.log('collection from CollectionPage: ', collection)
  // console.log('match from CollectionPage: ', match);
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {
          items.map(item => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  )
};

// use regular mapStateToProps here not createStructuredSelector (which passes state for us),
// because in addition to state we need mapStateToProps' second param 'ownProps',
// which contains the props being passed to the component being wrapped in connect(),
// which in this case include match/history/location from Router. Unlike our other selectors,
// which just return a part of state, selectCollection in shop.selectors.js returns a function
// that returns a part of state based on the URL param; selectors also need state, so pass
// state to that function using currying
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);