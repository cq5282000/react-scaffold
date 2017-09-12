/**
 * Created by chenqu on 2017/8/7.
 */
import React, { Component } from 'react';
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import { connect } from 'react-redux';

// import reducer from '../reducers';
import actions from '../actions/appAction';
import './App.pcss';

// const logger = createLogger();
// const store = createStore(combineReducers(reducer), compose(
//     applyMiddleware(logger),
//     window.devToolsExtension ? window.devToolsExtension() : (f) => f,
// ));
let interval = null;

class App extends Component {
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

    // componentWillMount() {
    //     store.subscribe(this.update);
    // }

    // update = () => {
    //     const num = store.getState().computerReducer.num;
    //     const show = store.getState().alertReducer.show;
    //     this.setState({
    //         num,
    //         show,
    //     });
    // };

    addNum = () => {
        console.log(actions.addNum());
        // store.dispatch(actions.addNum());
        const { addNum } = this.props;
        addNum();
    };

    minusNum = () => {
        console.log(actions.minusNum());
        // store.dispatch(actions.minusNum());
        const { minusNum } = this.props;
        minusNum();
    };

    clearNum = () => {
        console.log(actions.clearNum());
        // store.dispatch(actions.clearNum());
        const { clearNum } = this.props;
        clearNum();
    };

    showAlert = () => {
        // store.dispatch(actions.showAlert());
        const { showAlert, hideAlert } = this.props;
        showAlert();
        if (interval) {
            clearInterval(interval);
        }
        interval = setTimeout(() => {
            // store.dispatch(actions.hideAlert());
            hideAlert();
        }, 2000);
    }

    render() {
        const { num, show } = this.props;
        return (
            <div className="wrap">
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">{num}</span>
                <div>
                    <button className="btn-style" onClick={this.addNum}>+</button>
                    <button className="btn-style" onClick={this.minusNum}>-</button>
                    <button className="btn-style" onClick={this.clearNum}>clearAll</button>
                    <button className="btn-style" onClick={this.showAlert}>显示alert</button>
                </div>
                {
                    show && <div className="alert-style">这是一个Alert</div>
                }
            </div>
        );
    }
}

export default connect((state) => ({
    show: state.alertReducer.show,
    num: state.computerReducer.num,
}), {
    addNum: actions.addNum,
    minusNum: actions.minusNum,
    clearNum: actions.clearNum,
    showAlert: actions.showAlert,
    hideAlert: actions.hideAlert,
})(App);
