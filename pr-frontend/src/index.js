import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { persistor } from './store';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);
reportWebVitals();
