import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

import './ConfigurationExample';
import CustomComponentExample from './CustomComponentExample';
import Toasts from './Toasts';

export default () => {
  return (
    <SafeAreaView>
      <Button
        title="Content-only shorthand (string)"
        onPress={() => Toasts.add('Content-only shorthand (string)')}
      />
      <Button
        title="Content-only shorthand (node)"
        onPress={() => Toasts.add(<Text>Content-only shorthand (node)</Text>)}
      />
      <Button
        title="Props-based toast"
        onPress={() => Toasts.add({ content: 'Props-based toast', duration: 3500 })}
      />
      <CustomComponentExample />
    </SafeAreaView>
  );
};
