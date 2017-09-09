/**
 * Created by chenqu on 2017/9/4.
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../containers/app';

console.log(module.hot);
render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    console.log('react-hot-loader111');
    module.hot.accept('../containers/app.js', () => {
        console.log('react hot loader');
        const NextApp = require('../containers/app.js').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}

