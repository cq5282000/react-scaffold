/**
 * Created by chenqu on 2017/9/12.
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

const logger = createLogger();
const store = createStore(combineReducers(reducer), compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers').default;
        store.replaceReducer(combineReducers(nextReducer));
    });
}

export default (Entry) => {
    return render(
        <AppContainer>
            <Provider store={store}>
                <Entry/>
            </Provider>
        </AppContainer>,
        document.getElementById('app'),
    );
};
