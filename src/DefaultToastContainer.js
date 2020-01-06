import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { map } from 'lodash';

const styles = StyleSheet.create({
  toastContainer: {
    ...StyleSheet.absoluteFill, // The stack of toasts appears over the app UI
    justifyContent: 'flex-end', // Align toasts to the bottom of the screen
    alignItems: 'center', // Horizontally center the toasts
  },
});

export const DefaultToastContainer = ({ toasts }) => (
  <SafeAreaView style={styles.toastContainer} pointerEvents="box-none">
    {map(toasts, ({ ToastComponent, ...toastProps }) => (
      <ToastComponent {...toastProps} />
    ))}
  </SafeAreaView>
);

export default DefaultToastContainer;
