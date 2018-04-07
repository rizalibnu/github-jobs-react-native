// @flow
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  Share,
  StatusBar,
} from 'react-native';
import {
  Colors,
  withTheme,
  Toolbar,
  ToolbarBackAction,
  ToolbarContent,
  ToolbarAction,
} from 'react-native-paper';
import type { Theme } from 'react-native-paper/types'; /* eslint import/extensions: 0, import/no-unresolved: 0 */
import DialogAbout from './DialogAbout';

type Props = {
  navigation: any,
  children: any,
  title: string,
  subtitle: string,
  theme: Theme,
  hideSearch: boolean,
  hideShare: boolean,
  share: Object,
};

type State = {
  dialogVisible: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});

class BaseLayout extends React.PureComponent<Props, State> {
  static defaultProps = {
    hideShare: false,
    hideSearch: false,
    title: '',
    subtitle: '',
  }

  constructor() {
    super();
    this.state = {
      dialogVisible: false,
    };

    this.handleShare = this.handleShare.bind(this);
  }

  handleShare: Function;
  handleShare() {
    const { share } = this.props;

    Share.share({
      ...Platform.select({
        ios: {
          message: `${share.title} job at ${share.company} in ${share.location}`,
          url: share.url,
        },
        android: {
          message: `${share.title} job at ${share.company} in ${share.location}${' \n'}${share.url}`,
        },
      }),
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  openDialog = () => this.setState({ dialogVisible: true });
  closeDialog = () => this.setState({ dialogVisible: false });

  render() {
    const {
      navigation,
      children,
      title,
      subtitle,
      hideSearch,
      hideShare,
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: background }]}>
        <StatusBar
          backgroundColor="#2B7FC3"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <Toolbar>
          <ToolbarBackAction
            onPress={() => navigation.goBack()}
          />
          <ToolbarContent
            title={title}
            subtitle={subtitle !== '' && subtitle}
          />
          {!hideSearch &&
            <ToolbarAction
              icon="search"
              onPress={() => navigation.goBack()}
            />}
          {!hideShare &&
            <ToolbarAction
              icon="share"
              onPress={this.handleShare}
            />}
          <ToolbarAction icon="more-vert" onPress={this.openDialog} />
        </Toolbar>
        {children}
        <DialogAbout visible={this.state.dialogVisible} close={this.closeDialog} />
      </SafeAreaView>
    );
  }
}

export default withTheme(BaseLayout);
