import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// redux stuff
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers/rootreducer';
import 'semantic-ui-css/semantic.min.css';
//import "antd/dist/antd.css";

const store = createStore( reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
