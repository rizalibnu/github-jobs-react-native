// @flow
import * as React from 'react';

import Job from '../../components/Job';

type Props = {
  navigation: any,
};

class JobContainer extends React.PureComponent<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Job navigation={navigation} />
    );
  }
}

export default JobContainer;
