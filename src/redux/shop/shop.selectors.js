import { createSelector } from 'reselect';

// map our collection ids to collection labels, e.g, 1 >> hats
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = state => state.shop;

// 'collections' is the name we gave our shop data in shop.reducer.js
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// use COLLECTION_ID_MAP to select the collection by id (collectionUrlParam is /:collectionId
// part of url); this selector returns a function
// as is, a new selector function is created every time selectCollection is called,
// could memoize this function with lodash momoize, see
// https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/20796198#questions
// export const selectCollection = collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections => collections.find(
//       collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   );

// switched to using an object for directory data, improve lookup with no array.find()
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );

export const SelectCollectionsForPreview = createSelector(
  [selectCollections],
  // Object.keys returns the keys in the collections/shop.data.js as an array e.g., [array, hats, jackets, mens womens]
  // then map the keys to get the value(s) associated that key (all the collections)
  // now we have our collections as an array to use in CollectionsOverview component
  // giving a result a lot like our original selectCollection when it was an array
  collections => Object.keys(collections).map(key => collections[key])
  // or, collections => Object.values(collections)
)

