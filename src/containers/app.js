/**
 * Created by chenqu on 2017/8/7.
 */
import React, { Component } from 'react';
import { createStore } from 'redux';

import reducer from '../reducers/computerReducer';
import actions from '../actions/appAction';

const store = createStore(reducer);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
        };
    }

    componentWillMount() {
        store.subscribe(this.update);
    }

    update = () => {
        const num = store.getState().toString();
        this.setState({
            num,
        });
    };

    addNum = () => {
        store.dispatch(actions.addNum());
    };

    minusNum = () => {
        store.dispatch(actions.minusNum());
    };

    clearNum = () => {
        store.dispatch(actions.clearNum());
    };

    render() {
        const { num } = this.state;
        return (
            <div className="wrap">
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">{num}</span>
                <div>
                    <button size="large" className="numBtn" onClick={this.addNum}>+</button>
                    <button size="large" className="numBtn" onClick={this.minusNum}>-</button>
                    <button size="large" className="numBtn" onClick={this.clearNum}>clear</button>
                </div>
            </div>
        );
    }
}
