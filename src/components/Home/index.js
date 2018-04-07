// @flow
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {
  Colors,
  SearchBar,
  withTheme,
  Button,
} from 'react-native-paper';
import type { Theme } from 'react-native-paper/types'; /* eslint import/extensions: 0, import/no-unresolved: 0 */

import Logo from '../../../assets/logo.png';

type Props = {
  navigation: any,
  theme: Theme,
};

type State = {
  description: ?string,
  location: ?string,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  logoWrapper: {
    marginBottom: 30,
    alignItems: 'center',
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  labelDesc: {
    fontSize: 14,
    color: Colors.grey800,
  },
  caption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      description: '',
      location: '',
    };
  }

  render() {
    const { navigation, theme: { colors: { background } } } = this.props;

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.wrapper}>
          <View style={[styles.row, styles.logoWrapper]}>
            <Image source={Logo} />
          </View>
          <View style={styles.row}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>
                what
              </Text>
              <Text style={styles.labelDesc}>
                job title, keywords, or company
              </Text>
            </View>
            <SearchBar
              onChangeText={query => this.setState({ description: query })}
              value={this.state.description}
              onIconPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.labelWrapper}>
              <Text style={styles.label}>
                where
              </Text>
              <Text style={styles.labelDesc}>
                city, province, or region
              </Text>
            </View>
            <SearchBar
              onChangeText={query => this.setState({ location: query })}
              value={this.state.location}
              onIconPress={() => {}}
              icon="location-on"
            />
          </View>
          <View style={[styles.row, { marginTop: 20 }]}>
            <Button
              raised
              primary
              onPress={() => navigation.navigate({
                key: 'JobList',
                routeName: 'JobList',
                params: {
                  data: {
                    description: this.state.description,
                    location: this.state.location,
                  },
                },
              })}
            >
              <Text>
                Find Jobs
              </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(Home);
