/**
 * Created by chenqu on 2017/9/23.
 */
import fetch from '../libs/fetch';

export const fetchListData = async(param) => {
    const responseData = await fetch({
        url: './list',
        param,
    });
    if (!responseData.data) {
        responseData.data = [];
    }
    return responseData.data;
};
