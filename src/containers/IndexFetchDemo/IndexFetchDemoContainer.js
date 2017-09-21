/**
 * Created by chenqu on 2017/9/19.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/fetchAction';

class IndexFetchDemoContainer extends Component {
    constructor(props) {
        super(props);
        console.log('IndexFetchDemoContainer');
    }

    componentWillMount() {
        const { fetchList } = this.props;
        fetchList();
    }

    render() {
        const { listData } = this.props;
        return (<div>{ JSON.stringify(listData) }</div>);
    }
}

export default connect((state) => ({
    listData: state.fetchReducer.listData,
}), {
    fetchList: actions.fetchList,
})(IndexFetchDemoContainer);
