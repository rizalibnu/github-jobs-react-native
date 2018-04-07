/* @flow */

import * as React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import {
  Paragraph,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const DialogAbout = ({
  visible,
  close,
}: {
  visible: boolean,
  close: Function,
}) => (
  <Dialog
    onDismiss={close}
    style={{ backgroundColor: '#2B7FC3' }}
    visible={visible}
  >
    <DialogTitle style={{ color: 'white' }}>About</DialogTitle>
    <DialogContent>
      <Paragraph style={{ color: 'white' }}>
        Github Jobs - Unofficial Mobile App
      </Paragraph>
      <Paragraph style={{ color: 'white' }}>
        <Text>Built with </Text>
        <Icon name="ios-heart" backgroundColor="red" style={{ paddingHorizontal: 15 }} />
        <Text> in Jakarta & Cilacap</Text>
      </Paragraph>
      <TouchableOpacity onPress={() => { Linking.openURL('http://www.rizalibnu.com'); }}>
        <Text style={{ color: 'white', paddingTop: 10 }}>
          www.rizalibnu.com
        </Text>
      </TouchableOpacity>
    </DialogContent>
    <DialogActions>
      <Button color="white" onPress={close}>
        CLOSE
      </Button>
    </DialogActions>
  </Dialog>
);

export default DialogAbout;
