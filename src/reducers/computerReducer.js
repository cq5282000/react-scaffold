/**
 * Created by chenqu on 2017/9/11.
 */
import * as constant from '../configs/actions';

export default (state, action) => {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case constant.INCREASEMENT:
            return state + 1;
        case constant.DECREMENT:
            return state - 1;
        case constant.CLEAR_NUM:
            return 0;
        default:
            return state;
    }
};
