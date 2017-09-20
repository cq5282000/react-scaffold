/**
 * Created by chenqu on 2017/9/19.
 */
import * as constant from '../../configs/actions';
import { createReducer } from '../../libs/common';

const defaultState = {
    listData: {},
};

export default createReducer(defaultState, {
    [constant.FETCH_LIST]: (state, action) => {
        return {
            ...state,
            listData: action.data,
        };
    },
});
