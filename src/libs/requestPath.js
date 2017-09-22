/**
 * Created by chenqu on 2017/9/22.
 */
const path = require('path');

export default (url) => {
    return path.resolve(`${url}.json`);
};
