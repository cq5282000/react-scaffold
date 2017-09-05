/**
 * Created by chenqu on 2017/9/4.
 */
import React, { PureComponent } from 'react';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }

    onClick() {
        console.log('test');
    }

    render() {
        return (
            <div onClick={this.onClick}><h1>12asda</h1><h1>123</h1></div>
        );
    }
}
