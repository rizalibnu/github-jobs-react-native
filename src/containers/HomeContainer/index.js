// @flow
import * as React from 'react';

import Home from '../../components/Home';

type Props = {
  navigation: any,
};

class HomeContainer extends React.PureComponent<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Home navigation={navigation} />
    );
  }
}

export default HomeContainer;
