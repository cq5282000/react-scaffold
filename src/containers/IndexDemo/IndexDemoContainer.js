/**
 * Created by chenqu on 2017/9/9.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import IndexComponent from '@visus-components/IndexComponent/IndexComponent';
import IndexComponent from '../../components/IndexComponent/IndexComponent';
import actions from '../../actions/appAction';
import './IndexDemoContainer.pcss';

let interval = null;

class IndexDemoContainer extends Component {
    constructor(props) {
        super(props);
        this.minusNum = ::this.minusNum;
        this.addNum = ::this.addNum;
        this.clearNum = ::this.clearNum;
        this.showAlert = ::this.showAlert;
    }

    addNum = () => {
        console.log(actions.addNum());
        const { addNum } = this.props;
        addNum();
    };

    minusNum = () => {
        console.log(actions.minusNum());
        const { minusNum } = this.props;
        minusNum();
    };

    clearNum = () => {
        console.log(actions.clearNum());
        const { clearNum } = this.props;
        clearNum();
    };

    showAlert = () => {
        const { showAlert, hideAlert } = this.props;
        showAlert();
        if (interval) {
            clearInterval(interval);
        }
        interval = setTimeout(() => {
            hideAlert();
        }, 2000);
    }

    render() {
        const { num, show } = this.props;
        return (
            <div className="wrap">
                <IndexComponent/>
                <h3>origin Redux</h3>
                Current Number: <span className="numValue">{num}</span>
                <div>
                    <button className="btn-style" onClick={this.addNum}>+</button>
                    <button className="btn-style" onClick={this.minusNum}>-</button>
                    <button className="btn-style" onClick={this.clearNum}>clearAll</button>
                    <button className="btn-style" onClick={this.showAlert}>显示alert</button>
                </div>
                {
                    show && <div className="alert-style">alert info</div>
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
})(IndexDemoContainer);
