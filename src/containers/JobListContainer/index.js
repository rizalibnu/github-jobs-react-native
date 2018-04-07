// @flow
import * as React from 'react';

import JobList from '../../components/JobList';

type Props = {
  navigation: any,
};

type State = {
  data: Array<Object>,
  page: number,
  loading: boolean,
  refreshing: boolean,
};

/**
 * 50 is default value of github jobs api pagination, don't change it
 */
const limitPerPage = 50;

class JobListContainer extends React.PureComponent<Props, State> {
  constructor() {
    super();
    this.state = {
      data: [],
      page: 0,
      loading: false,
      refreshing: false,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { description, location } = this.props.navigation.state.params.data;
    const desc = description !== '' ? description : '';
    const loc = location !== '' ? location : '';
    this.setState({ loading: true });
    const response = await fetch(`https://jobs.github.com/positions.json?description=${desc}&location=${loc}&page=${this.state.page}`);
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json],
      loading: false,
      refreshing: false,
      empty: this.state.data.length === 0 && true,
    }));
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        page: 0,
        data: [],
      },
      () => {
        this.fetchData();
      },
    );
  };

  handleEnd = () => {
    if (this.state.data.length >= limitPerPage) {
      this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    }
  };

  render() {
    const { navigation } = this.props;
    const { data, loading, refreshing } = this.state;

    return (
      <JobList
        navigation={navigation}
        data={data}
        loading={loading}
        refreshing={refreshing}
        callbackHandleRefresh={() => this.handleRefresh()}
        callbackHandleEnd={() => this.handleEnd()}
      />
    );
  }
}

export default JobListContainer;
