/**
 * Created by chenqu on 2017/9/19.
 */
import 'whatwg-fetch';

export default (config) => {
    const { url } = config;
    fetch(url)
        .then((response) => {
            return response.json();
        }).then((json) => {
            console.log('parsed json', json);
        }).catch((ex) => {
            console.log('parsing failed', ex);
        });
};
