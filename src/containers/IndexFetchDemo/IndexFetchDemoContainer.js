/**
 * Created by chenqu on 2017/9/19.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/fetchAction';
import Waiting from '../../components/Waiting/Waiting';

class IndexFetchDemoContainer extends Component {
    constructor(props) {
        super(props);
        this.fetchData = ::this.fetchData;
        this.state = {
            waiting: false,
        };
    }

    componentWillMount() {}

    fetchData = async() => {
        await this.setState({
            waiting: true,
        });
        const { fetchList } = this.props;
        await fetchList();
        await this.setState({
            waiting: false,
        });
    }

    render() {
        const { listData } = this.props;
        const { waiting } = this.state;
        return (
            <div>
                <button onClick={this.fetchData}>发起fetch请求</button>
                {
                    waiting && <Waiting height="400px"/>
                }
                {
                    !waiting && <div>{ JSON.stringify(listData) }</div>
                }

            </div>
        );
    }
}

export default connect((state) => ({
    listData: state.fetchReducer.listData,
}), {
    fetchList: actions.fetchList,
})(IndexFetchDemoContainer);
