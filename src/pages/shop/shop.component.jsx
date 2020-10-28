import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component.jsx'

// converted ShopPage component from Class a to a functional component when reduxing it
// Nested Routing: We put these Routes here instead of App.js so that they become independent
// of any preceding path specs, e.g., /whatever/whatev/shop --using match.path lets
// us avoid hardcoding urls, url just begins wherever we are (/shop here)
// ShopPage is in a Route in App.js, so we have access to props history/location/match
const ShopPage = ({ match }) => {
  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  )
};

export default ShopPage;

