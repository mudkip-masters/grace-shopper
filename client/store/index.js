import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import productReducer from './SingleProduct';
import orderReducer from './order';
import orderProductsReducer from './OrderProducts';

const reducer = combineReducers({
  auth,
  products,
  product: productReducer,
  order: orderReducer,
  orderProducts: orderProductsReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
