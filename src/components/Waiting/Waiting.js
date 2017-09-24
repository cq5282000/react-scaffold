/**
 * Created by chenqu on 2017/9/6.
 */

import React, { PureComponent } from 'react';
import './Waiting.pcss';

export default class Waiting extends PureComponent {
    render() {
        const { height } = this.props;
        return (
            <div className="waiting" style={{ height }}>
                <div className="spinner-container container1">
                    <div className="circle1"/>
                    <div className="circle2"/>
                    <div className="circle3"/>
                    <div className="circle4"/>
                </div>
                <div className="spinner-container container2">
                    <div className="circle1"/>
                    <div className="circle2"/>
                    <div className="circle3"/>
                    <div className="circle4"/>
                </div>
            </div>
        );
    }
}
