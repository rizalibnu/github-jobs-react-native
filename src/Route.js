// @flow
import { StackNavigator } from 'react-navigation';
import HomeContainer from './containers/HomeContainer';
import JobListContainer from './containers/JobListContainer';
import JobContainer from './containers/JobContainer';

const Route = StackNavigator(
  {
    Home: { screen: HomeContainer },
    JobList: { screen: JobListContainer },
    Job: { screen: JobContainer },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default Route;
