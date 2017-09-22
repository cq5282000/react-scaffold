/**
 * Created by chenqu on 2017/9/19.
 */
import 'whatwg-fetch';
import * as env from '../configs/env';
import envConst from '../configs/envConst';
import * as requestMethod from '../configs/requestMethod';
import requestPath from './requestPath';

const MOCK_DELAY = 1000;

const getMockData = async({
    url,
    param,
    method = requestMethod.GET,
    mockDelay = MOCK_DELAY,
}) => {
    const context = require.context('../../mock-server/api', true, /\.js(on)?$/);
    let responseData = null;
    const requestUrl = requestPath(url);
    try {
        // responseData = context(`${requestUrl}.json`);
        responseData = context(requestUrl);
        console.log('responseData:', responseData);
    } catch (e) {
        throw new Error('404 Not Found');
    }
    return {
        json: () => {
            return responseData;
        },
        status: 200,
    };
};

export default (config) => {
    // const { url } = config;
    let responseData = null;
    if (envConst === env.LOCAL || envConst === env.DEVELOPMENT) {
        responseData = getMockData(config).json();
    }
    return responseData;
    // fetch(url)
    //     .then((response) => {
    //         return response.json();
    //     }).then((json) => {
    //         console.log('parsed json', json);
    //     }).catch((ex) => {
    //         console.log('parsing failed', ex);
    //     });
};
