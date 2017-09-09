/**
 * Created by chenqu on 2017/9/4.
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MainContainer from '../containers/MainContainer';

render(
    <AppContainer>
        <MainContainer/>
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('../containers/MainContainer.js', () => {
        console.log('react hot loader');
        const NextApp = require('../containers/MainContainer.js').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
