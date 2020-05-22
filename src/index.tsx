import React from 'react';
import {render} from "react-dom";
import {Provider} from "react-redux";

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from "./store/store";

const store = configureStore();
const target = document.getElementById('root');

const renderApp = () => {
    render(
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>,
        target
    )
};
renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
