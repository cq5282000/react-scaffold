/**
 * Created by chenqu on 2017/9/4.
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import IndexDemoContainer from '../containers/IndexDemo/IndexDemoContainer';
import reducer from '../reducers';

const logger = createLogger();
const store = createStore(combineReducers(reducer), compose(
    applyMiddleware(logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
));

render(
    <AppContainer>
        <Provider store={store}>
            <IndexDemoContainer/>
        </Provider>
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    console.log('react-hot-loader111');
    module.hot.accept('../containers/IndexDemo/IndexDemoContainer', () => {
        console.log('react hot loader');
        const NextApp = require('../containers/IndexDemo/IndexDemoContainer').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp/>
                </Provider>
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
