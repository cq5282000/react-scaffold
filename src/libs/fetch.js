/**
 * Created by chenqu on 2017/9/19.
 */
import 'whatwg-fetch';
import nodeUrl from 'url';
import querystring from 'querystring';
import * as env from '../configs/env';
import envConst from '../configs/envConst';
import * as requestMethod from '../configs/requestMethod';
import sleep from './sleep';
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
        responseData = context(requestUrl);
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

const timeoutPromise = async(timeout) => {
    await sleep(timeout);
    // throw new TimeoutError(timeout);
};

const fetchOriginData = async({
    url,
    param,
    method = requestMethod.GET,
    mockDelay = MOCK_DELAY,
}) => {
    const reqMethod = method.toUpperCase();
    const options = {
        method: reqMethod,
        credentials: 'include',
    };
    let reqPath = '';
    if (reqMethod === requestMethod.GET) {
        const requestUrl = requestPath(url);
        reqPath = nodeUrl.format({
            pathname: requestUrl,
            query: param,
        });
    } else if (reqMethod === requestMethod.POST) {
        reqPath = requestPath(url);
        // const flatData = Object.keys(param).reduce((obj, key) => {
        //     const value = param[key];
        //     if (typeof value === 'object') {
        //         return { ...obj, [key]: JSON.stringify(value) };
        //     }
        //     return { ...obj, [key]: value };
        // }, {});
        // options.body = querystring.stringify(flatData);
        options.body = JSON.stringify(param);
        options.headers = {
            'Content-Type': 'application/json',
        };
    }
    const response = await fetch(reqPath, options);
    const responseData = await Promise.race([timeoutPromise(60000), response.json()]);
    /**
     * 差错处理部分，还没做，待完善
     */
    return {
        json: () => responseData,
    };
};

export default async(config) => {
    let responseData = null;
    if (envConst === env.LOCAL || envConst === env.DEVELOPMENT) {
        responseData = await getMockData(config);
        await sleep(MOCK_DELAY);
    } else {
        responseData = await fetchOriginData(config);
    }
    return responseData.json();
};
