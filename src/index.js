import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
// import reducer from './store/reducer';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

// Global configurations to be used in the whole application
// Set up the base URL on which other paths will be appended to
axios.defaults.baseURL = 'https://moove-fit-demo-default-rtdb.firebaseio.com/';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// An interceptor to handle requests
axios.interceptors.request.use(request => {
  console.log(request); // Do something with the request configurations 
  return request;
}, error => {
  // Handle any errors
  console.log(error);

  // Make sure to forward the error to our request as we load it in a local component for handling
  return Promise.reject(error); // Maybe show something globally on the UI or write to log file
});

// An interceptor to handle responses 
axios.interceptors.response.use(response => {
  console.log(response); // Do something with the response configurations 
  return response;
}, error => {
  // Handle any errors
  console.log(error);

  // Make sure to forward the error to our response as we load it in a local component for handling
  return Promise.reject(error); // Maybe show something globally on the UI or write to log file
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
