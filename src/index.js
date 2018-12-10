import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import App from './App';

import { API_WS_ROOT } from './constants/constants';

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
  	<Router>
    	<App />
    </Router>	
  </ActionCableProvider>,
  document.getElementById('root')
);

serviceWorker.register();

