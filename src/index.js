import React from 'react';
import { LayoutAnimation, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { filter, map, merge, uniqueId } from 'lodash';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const styles = StyleSheet.create({
  toastContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toast: {
    alignSelf: 'stretch',
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    margin: 16,
    marginTop: 0,
    padding: 16,
  },
});

export const DefaultToastContainer = ({ toasts }) => (
  <SafeAreaView style={styles.toastContainer} pointerEvents="box-none">
    {map(toasts, ({ ToastComponent, ...toastProps }) => (
      <ToastComponent {...toastProps} />
    ))}
  </SafeAreaView>
);

export const DefaultToast = ({ content }) => {
  const cleanContent = (typeof content === 'string')
    ? <Text>{content}</Text>
    : content;

  return (
    <View style={styles.toast}>
      {cleanContent}
    </View>
  );
};

const Toast = (props) => {
  const {
    layoutAnimationConfig,
    ToastContainerComponent,
  } = props;
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    Toast.methods = { setToasts };
  }, []);

  React.useEffect(() => {
    LayoutAnimation.configureNext(layoutAnimationConfig);
  }, [toasts]);

  return (
    <ToastContainerComponent toasts={toasts} />
  );
};
Toast.add = (props) => {
  // Auto-configure if it was not called manually
  if (!Toast.rootSiblings) {
    Toast.configure();
    setTimeout(() => Toast.add(props), 1);
    return;
  }

  // Validate and apply defaults
  let validatedProps = (typeof props === 'object' && !React.isValidElement(props)) ? props : { content: props };
  validatedProps = { ...Toast.configuration.defaultToastProps, ...validatedProps };

  const id = uniqueId();
  Toast.methods.setToasts((toasts) => [...toasts, {
    ...validatedProps,
    key: id,
    id,
    close: () => Toast.remove(id),
  }]);

  if (validatedProps.duration) {
    setTimeout(() => Toast.remove(id), validatedProps.duration);
  }

  return id;
};
Toast.remove = (id) => {
  Toast.methods.setToasts((toasts) => {
    return filter(toasts, (toast) => toast.id !== id);
  });
};
Toast.configure = (customConfiguration = null) => {
  const configuration = merge({}, defaultConfiguration, customConfiguration);
  Toast.configuration = configuration;

  Toast.rootSiblings = new RootSiblings(
    <Toast {...configuration} />
  );
};

const defaultConfiguration = {
  defaultToastProps: {
    duration: 3500,
    ToastComponent: DefaultToast,
  },
  layoutAnimationConfig: LayoutAnimation.Presets.easeInEaseOut,
  ToastContainerComponent: DefaultToastContainer,
};

export default Toast;
