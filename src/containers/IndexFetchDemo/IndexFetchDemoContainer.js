/**
 * Created by chenqu on 2017/9/19.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/fetchAction';

class IndexFetchDemoContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchData = ::this.fetchData;
    }

    componentWillMount() {}

    fetchData = () => {
        const { fetchList } = this.props;
        fetchList();
    }

    render() {
        const { listData } = this.props;
        return (
            <div>
                <button onClick={this.fetchData}>发起fetch请求</button>
                <div>{ JSON.stringify(listData) }</div>
            </div>
        );
    }
}

export default connect((state) => ({
    listData: state.fetchReducer.listData,
}), {
    fetchList: actions.fetchList,
})(IndexFetchDemoContainer);
