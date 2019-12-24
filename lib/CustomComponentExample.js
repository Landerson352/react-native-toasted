import React from 'react';
import { Button, Text, View } from 'react-native';

import Toast from './Toast';

// Once you create a custom component,
//  you can assign as defaultToastProps.ToastComponent
//  or as a one-time use case when adding a toast with the ToastComponent prop (see below).
const MyToast = (props) => {
  const { backgroundColor, content, id } = props;

  return (
    <View style={{ backgroundColor, padding: 16, marginBottom: 16 }}>
      <Text>Toast Id: {id}</Text>
      <Text>Content: "{content}"</Text>
      <Button title="Dismiss" onPress={() => Toast.remove(id)} />
    </View>
  );
};

export default () => (
  <Button
    title="Custom-component toast"
    onPress={() => Toast.add({
      backgroundColor: 'yellow',
      content: 'Custom-component toast',
      duration: null, // a null duration will keep the toast open until manually dismissed
      ToastComponent: MyToast,
    })}
  />
);
