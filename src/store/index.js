import { createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducer';
import dataTaskList from '../middlewares/dataTaskList';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(dataTaskList),
);
//mise en place du store du redux devtools pour visualiser le state
const store = createStore(reducer, enhancers);

export default store;