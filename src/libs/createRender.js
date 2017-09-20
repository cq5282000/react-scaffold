/**
 * Created by chenqu on 2017/9/12.
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './configureStore';

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
