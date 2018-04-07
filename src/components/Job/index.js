// @flow
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import {
  Colors,
  withTheme,
  Button,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import Moment from 'moment';

import BaseLayout from '../BaseLayout';
import DialogApply from './DialogApply';

type Props = {
  navigation: any,
};

type State = {
  refreshing: boolean,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  col: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  company: {
    marginTop: 10,
  },
  location: {
    marginTop: 10,
  },
  published: {
    marginTop: 15,
    fontSize: 12,
    color: Colors.grey600,
  },
  how_to_apply: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  applyButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width - 8,
  },
});

/* eslint camelcase: 0 */
class Job extends React.PureComponent<Props, State> {
  constructor() {
    super();
    this.state = {
      dialogVisible: false,
    };
  }

  openDialog = () => this.setState({ dialogVisible: true });
  closeDialog = () => this.setState({ dialogVisible: false });

  /* eslint class-methods-use-this: 0 */
  slice: Function;
  slice(val) {
    const url = val.slice(4);
    return `https${url}`;
  }

  render() {
    const { navigation } = this.props;
    const {
      description,
      title,
      company,
      location,
      type,
      created_at,
      how_to_apply,
      url,
    } = navigation.state.params.data;

    Moment.locale('en');

    return (
      <BaseLayout
        navigation={navigation}
        title="Job Detail"
        hideSearch
        share={{ title, url, location, company }}
      >
        <ScrollView style={styles.wrapper}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.company}>{company}{type && ` - ${type}`}</Text>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.published}>
              {Moment(Moment(created_at).format('YYYYMMDD'), 'YYYYMMDD').fromNow()}
            </Text>
            <HTML
              html={description}
              onLinkPress={(evt, href) => { Linking.openURL(href); }}
              baseFontStyle={{
                fontSize: 16,
                lineHeight: 30,
              }}
              tagsStyles={{
                a: {
                  textDecorationLine: 'none',
                },
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.applyButtonWrapper}>
          <Button
            raised
            color="orange"
            compact
            onPress={this.openDialog}
            style={{ width: '100%' }}
          >
            Apply Now
          </Button>
        </View>
        <DialogApply visible={this.state.dialogVisible} close={this.closeDialog} howToApply={how_to_apply} />
      </BaseLayout>
    );
  }
}

export default withTheme(Job);
