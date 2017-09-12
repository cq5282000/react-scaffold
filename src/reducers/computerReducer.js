/**
 * Created by chenqu on 2017/9/11.
 */
import * as constant from '../configs/actions';

const defaultState = {
    num: 0,
};

export default (state = defaultState, action) => {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case constant.INCREASEMENT:
            return {
                ...state,
                num: state.num + 1,
            };
        case constant.DECREMENT:
            return {
                ...state,
                num: state.num - 1,
            };
        case constant.CLEAR_NUM:
            return {
                ...state,
                num: 0,
            };
        default:
            return state;
    }
};
