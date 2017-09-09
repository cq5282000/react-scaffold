/**
 * Created by chenqu on 2017/9/9.
 */
import React, { Component } from 'react';
import MainComponent from '../components/MainComponent';

export default class MainContainer extends Component {
    render() {
        return (
            <div>
                <MainComponent/>
                <div>MainContainer</div>
            </div>
        );
    }
}
