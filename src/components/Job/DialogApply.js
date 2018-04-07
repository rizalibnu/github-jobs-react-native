/* @flow */

import * as React from 'react';
import {
  ScrollView,
  Linking,
} from 'react-native';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogScrollArea,
} from 'react-native-paper';
import HTML from 'react-native-render-html';

const DialogApply = ({
  visible,
  close,
  howToApply,
}: {
  visible: boolean,
  close: Function,
  howToApply: string,
}) => (
  <Dialog onDismiss={close} visible={visible}>
    <DialogTitle>How to Apply:</DialogTitle>
    <DialogScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        <HTML
          html={howToApply}
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
      </ScrollView>
    </DialogScrollArea>
    <DialogActions>
      <Button primary onPress={close}>
        CLOSE
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogApply;
