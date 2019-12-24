import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

import './ConfigurationExample';
import CustomComponentExample from './CustomComponentExample';
import Index from '../index';

export default () => {
  return (
    <SafeAreaView>
      <Button
        title="Content-only shorthand (string)"
        onPress={() => Index.add('Content-only shorthand (string)')}
      />
      <Button
        title="Content-only shorthand (node)"
        onPress={() => Index.add(<Text>Content-only shorthand (node)</Text>)}
      />
      <Button
        title="Props-based toast"
        onPress={() => Index.add({ content: 'Props-based toast', duration: 3500 })}
      />
      <CustomComponentExample />
    </SafeAreaView>
  );
};
