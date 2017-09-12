/**
 * Created by chenqu on 2017/9/12.
 */
import * as constant from '../../configs/actions';
import { createReducer } from '../../libs/common';

const defaultState = {
    show: false,
};

export default createReducer(defaultState, {
    [constant.SHOW_ALERT]: (state, action) => {
        return {
            ...state,
            show: true,
        };
    },
    [constant.HIDE_ALERT]: (state, action) => {
        return {
            ...state,
            show: false,
        };
    },
});
