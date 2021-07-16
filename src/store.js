import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [
  thunkMiddleware,
  createLogger({
    // logger: {
    //   log(...args) {
    //     if(args.length === 3 && args[2]){
    //       args[2] =
    //     }
    //     console.log(arguments);
    //   },
    // },
  }),
];

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}
