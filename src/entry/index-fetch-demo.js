/**
 * Created by chenqu on 2017/9/4.
 */
import IndexDemoContainer from '../containers/IndexFetchDemo/IndexFetchDemoContainer';
import render from '../libs/createRender';

render(IndexDemoContainer);
if (module.hot) {
    module.hot.accept('../containers/IndexFetchDemo/IndexFetchDemoContainer', () => {
        const NewEntry = require('../containers/IndexFetchDemo/IndexFetchDemoContainer').default;
        render(NewEntry);
    });
}

