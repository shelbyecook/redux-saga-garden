import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';

// IMPORT MIDDLEWARE
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

// sagas waiting for dispatch
function* rootSaga() {
  yield takeEvery('GET_PLANTS', getPlants);
  yield takeEvery('ADD_PLANT', addPlant);
  yield takeEvery('DELETE_PLANT', deletePlant);
}

function* getPlants() {
  try {
    const response = yield axios.get('/api/plant');
    yield put({
      type: 'SET_PLANTS',
      payload: response.data,
    });
  } catch (err) {
    console.log(`Yikes, didn't get that. ${err}`);
  }
}

function* addPlant(action) {
  try {
    console.log(action.payload);
    yield axios.post('/api/plant', action.payload);
    yield put({
      type: 'GET_PLANTS',
    });
  } catch (err) {
    console.log(err);
  }
}

function* deletePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({
      type: 'GET_PLANTS',
    });
  } catch (err) {
    console.log(err);
  }
}

// SETUP saga/ADD saga
const sagaMiddleware = createSagaMiddleware();

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' },
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(logger, sagaMiddleware)
);

// to run sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);
