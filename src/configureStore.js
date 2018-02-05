import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { loadState } from './localStorage';
import handleWeather from './reducers/reducers';

const loggerMiddleware = createLogger();
const preloadedState = loadState();

export default function configureStore() {
  return createStore(
    handleWeather,
    preloadedState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}