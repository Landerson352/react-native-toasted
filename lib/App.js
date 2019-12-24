import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import Toast from 'react-native-toasty';

import './ConfigurationExample';
import CustomComponentExample from './CustomComponentExample';

export default () => {
  return (
    <SafeAreaView>
      <Button
        title="Content-only shorthand (string)"
        onPress={() => Toast.add('Content-only shorthand (string)')}
      />
      <Button
        title="Content-only shorthand (node)"
        onPress={() => Toast.add(<Text>Content-only shorthand (node)</Text>)}
      />
      <Button
        title="Props-based toast"
        onPress={() => Toast.add({ content: 'Props-based toast', duration: 3500 })}
      />
      <CustomComponentExample />
    </SafeAreaView>
  );
};
