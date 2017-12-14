/**
 * Created by chenqu on 2017/9/22.
 */
/**
 * Created by chenqu on 2017/9/22.
 */
import * as env from '../configs/env';
import envConst from '../configs/envConst';

export default (url) => {
    switch (envConst) {
        case env.DEVELOPMENT:
            return `.${url}.json`;
        case env.BETA:
            return `${location.protocol}//${location.host}${url}`;
        default:
            return null;
    }
};
