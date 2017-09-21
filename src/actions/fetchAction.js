/**
 * Created by chenqu on 2017/9/19.
 */
import * as constant from '../configs/actions';
import fetch from '../libs/fetch';

export default {
    fetchList: () => async(dispatch) => {
        const responseData = await fetch({
            url: 'list',
        });
        dispatch({
            type: constant.FETCH_LIST,
            data: responseData,
        });
    },
};
