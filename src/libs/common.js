/**
 * Created by chenqu on 2017/9/12.
 */
export const createReducer = (defaultState, handlers) => {
    return (state = defaultState, action) => {
        return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
    };
};
