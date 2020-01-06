import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  toast: {
    alignSelf: 'stretch', // This toast always spans the full width (minus margin)
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    margin: 16,
    marginTop: 0,
    padding: 16,
  },
});

export const DefaultToast = ({ content }) => {
  // Intercept string-based content and wrap with Text node
  const cleanContent = (typeof content === 'string')
    ? <Text>{content}</Text>
    : content;

  return (
    <View style={styles.toast}>
      {cleanContent}
    </View>
  );
};

export default DefaultToast;
