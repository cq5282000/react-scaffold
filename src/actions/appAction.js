/**
 * Created by chenqu on 2017/9/12.
 */
import * as constant from '../configs/actions';

export default {
    addNum: () => ({
        type: constant.INCREASEMENT,
    }),
    minusNum: () => ({
        type: constant.DECREMENT,
    }),
    clearNum: () => ({
        type: constant.CLEAR_NUM,
    }),
};
