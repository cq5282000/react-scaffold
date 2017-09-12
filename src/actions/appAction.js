/**
 * Created by chenqu on 2017/9/12.
 */
import * as constant from '../configs/actions';

export default {
    addNum: () => ({
        type: constant.INCREMENT,
    }),
    minusNum: () => ({
        type: constant.DECREMENT,
    }),
    clearNum: () => ({
        type: constant.CLEAR_NUM,
    }),
    showAlert: () => ({
        type: constant.SHOW_ALERT,
    }),
    hideAlert: () => ({
        type: constant.HIDE_ALERT,
    }),
};
