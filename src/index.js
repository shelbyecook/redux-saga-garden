import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import App from './App';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' },
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload];
    default:
      return state;
  }
};

function* rootSaga(action) {
  yield takeEvery('GET_PLANT', getPlant);
  yield takeEvery('POST_PLANT', postPlant);
  // register all of our sagas
}

//CREATE SAGAS - GET
function* getPlant(action) {
  try {
    const response = yield axios.get('/plant');
    yield put({
      type: 'SET_GARDEN', //DISPATCHING RESPONSE TO STATE (REDUCER)
      payload: response.data,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

function* postPlant(action) {
  try {
    yield axios.post('/plant', action.payload);
    // put = this.props.dispatch()
    yield put({
      type: 'GET_PLANT', //CALLING THE GET_FRUIT SAGA TO RUN, POST --> GET
    });
  } catch (err) {
    console.log(err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const plantReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANT':
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    plantList,
    getPlant,
    postPlant,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);
