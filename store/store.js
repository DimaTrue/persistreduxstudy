import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose;

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
  blacklist: ['counterReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

let persistor = persistStore(store);

export { store, persistor };
