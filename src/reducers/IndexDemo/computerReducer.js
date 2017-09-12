/**
 * Created by chenqu on 2017/9/11.
 */
import * as constant from '../../configs/actions';
import { createReducer } from '../../libs/common';

const defaultState = {
    num: 0,
};

export default createReducer(defaultState, {
    [constant.INCREMENT]: (state, action) => {
        return {
            ...state,
            num: state.num + 2,
        };
    },
    [constant.DECREMENT]: (state, action) => {
        return {
            ...state,
            num: state.num - 2,
        };
    },
    [constant.CLEAR_NUM]: (state, action) => {
        return {
            ...state,
            num: 0,
        };
    },
});
