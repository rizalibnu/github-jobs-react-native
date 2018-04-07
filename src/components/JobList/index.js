// @flow
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  Colors,
  withTheme,
  Card,
  CardContent,
} from 'react-native-paper';
import Moment from 'moment';

import BaseLayout from '../BaseLayout';

type Props = {
  navigation: any,
  data: Array<Object>,
  loading: boolean,
  refreshing: boolean,
  callbackHandleRefresh: Function,
  callbackHandleEnd: Function,
};

type State = {};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  col: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  company: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  location: {
    marginTop: 5,
  },
  published: {
    marginTop: 15,
    fontSize: 12,
    color: Colors.grey600,
  },
  companyLogoWrapper: {
    width: 50,
    height: 50,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  companyLogo: {
    width: 50,
    height: 50,
  },
});

class JobList extends React.PureComponent<Props, State> {
  constructor() {
    super();
    this.slice = this.slice.bind(this);
  }

  /* eslint class-methods-use-this: 0 */
  slice: Function;
  slice(val) {
    const url = val.slice(4);
    return `https${url}`;
  }

  renderJob = ({ item }) => {
    const { navigation } = this.props;

    Moment.locale('en');

    return (
      <Card
        onPress={() => navigation.navigate({
          key: 'Job',
          routeName: 'Job',
          params: {
            data: {
              id: item.id,
              created_at: item.created_at,
              title: item.title,
              location: item.location,
              type: item.type,
              description: item.description,
              how_to_apply: item.how_to_apply,
              company: item.company,
              company_url: item.company_url,
              company_logo: item.company_logo,
              url: item.url,
            },
          },
        })}
      >
        <CardContent>
          <View style={styles.col}>
            <View style={styles.row}>
              <View>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title ? item.title : ''}
                </Text>
              </View>
              <View style={styles.col}>
                <View>
                  <Text style={styles.company}>
                    {item.company ? item.company : ''}
                  </Text>
                </View>
                <View>
                  <Text>
                    {item.type ? item.type : ''}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.location}>
                  {item.location ? item.location : ''}
                </Text>
              </View>
              <View>
                <Text style={styles.published}>
                  {item.created_at ? Moment(Moment(item.created_at).format('YYYYMMDD'), 'YYYYMMDD').fromNow() : ''}
                </Text>
              </View>
            </View>
            {item.company_logo &&
            <View>
              <View style={styles.companyLogoWrapper}>
                <Image
                  source={{ uri: this.slice(item.company_logo) }}
                  style={styles.companyLogo}
                />
              </View>
            </View>}
          </View>
        </CardContent>
      </Card>
    );
  }

  renderFooter = () => {
    const { data, loading } = this.props;

    if (loading) {
      if (data.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height - 56 }}>
            <ActivityIndicator size="large" animating />
          </View>
        );
      }
      return <ActivityIndicator size="large" animating style={{ marginVertical: 20 }} />;
    }
    return null;
  };

  render() {
    const { navigation, data, loading, refreshing, callbackHandleRefresh, callbackHandleEnd } = this.props;
    const param = navigation.state.params;

    const loadingView = (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" animating />
      </View>
    );

    console.log(data, this.props.loading, refreshing);

    return (
      <BaseLayout
        navigation={navigation}
        title={param.data.description !== '' ? `${param.data.description} jobs` : 'Job Search'}
        subtitle={param.data.location !== '' ? ` in ${param.data.location}` : ''}
        hideShare
      >
        {!loading && !refreshing && data.length === 0 &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Sorry, not found</Text>
          </View>
        }
        {refreshing ? loadingView :
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderJob}
          onEndReached={callbackHandleEnd}
          onEndReachedThreshold={0.5}
          onRefresh={callbackHandleRefresh}
          refreshing={refreshing}
          ListFooterComponent={this.renderFooter}
        />}
      </BaseLayout>
    );
  }
}

export default withTheme(JobList);
