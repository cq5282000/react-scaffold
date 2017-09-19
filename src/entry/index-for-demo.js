/**
 * Created by chenqu on 2017/9/4.
 */
import IndexDemoContainer from '../containers/IndexDemo/IndexDemoContainer';
import render from '../libs/createRender';

render(IndexDemoContainer);
if (module.hot) {
    module.hot.accept('../containers/IndexDemo/IndexDemoContainer', () => {
        const NewEntry = require('../containers/IndexDemo/IndexDemoContainer').default;
        render(NewEntry);
    });
}

