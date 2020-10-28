import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// composeWithDevTools is needed for the Chrome redux devtools extension
// there are other ways to include it
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// redux-persist stores selected state in browser local storage
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

// set up middlewares to only be included in non-development mode (production or test)
// const middlewares = [logger];
const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);