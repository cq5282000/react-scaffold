/**
 * Created by chenqu on 2017/9/19.
 */
import * as constant from '../configs/actions';
import fetch from '../libs/fetch';

export default {
    fetchList: async() => {
        const responseData = await fetch('../../mock-server/api/list.json');
        return {
            type: constant.FETCH_LIST,
            data: responseData,
        };
    },
};
