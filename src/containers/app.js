/**
 * Created by chenqu on 2017/8/7.
 */
import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';

import reducer from '../reducers';
import actions from '../actions/appAction';

import './App.pcss';

const store = createStore(combineReducers(reducer));
let interval = null;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            show: false,
        };
        this.minusNum = ::this.minusNum;
        this.addNum = ::this.addNum;
        this.clearNum = ::this.clearNum;
        this.showAlert = ::this.showAlert;
    }

    componentWillMount() {
        store.subscribe(this.update);
    }

    update = () => {
        const num = store.getState().computerReducer.num;
        const show = store.getState().alertReducer.show;
        this.setState({
            num,
            show,
        });
    };

    addNum = () => {
        console.log(actions.addNum());
        store.dispatch(actions.addNum());
    };

    minusNum = () => {
        console.log(actions.minusNum());
        store.dispatch(actions.minusNum());
    };

    clearNum = () => {
        console.log(actions.clearNum());
        store.dispatch(actions.clearNum());
    };

    showAlert = () => {
        store.dispatch(actions.showAlert());
        if (interval) {
            clearInterval(interval);
        }
        interval = setTimeout(() => {
            store.dispatch(actions.hideAlert());
        }, 2000);
    }

    render() {
        const { num } = this.state;
        const { show } = this.state;
        return (
            <div className="wrap">
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">{num}</span>
                <div>
                    <button className="btn-style" onClick={this.addNum}>+</button>
                    <button className="btn-style" onClick={this.minusNum}>-</button>
                    <button className="btn-style" onClick={this.clearNum}>clear</button>
                    <button className="btn-style" onClick={this.showAlert}>显示alert</button>
                </div>
                {
                    show && <div className="alert-style">这是一个Alert</div>
                }
            </div>
        );
    }
}
