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

const Index = (props) => {
  const {
    layoutAnimationConfig,
    ToastContainerComponent,
  } = props;
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    Index.methods = { setToasts };
  }, []);

  React.useEffect(() => {
    LayoutAnimation.configureNext(layoutAnimationConfig);
  }, [toasts]);

  return (
    <ToastContainerComponent toasts={toasts} />
  );
};
Index.add = (props) => {
  // Auto-configure if it was not called manually
  if (!Index.rootSiblings) {
    Index.configure();
    setTimeout(() => Index.add(props), 1);
    return;
  }

  // Validate and apply defaults
  let validatedProps = (typeof props === 'object' && !React.isValidElement(props)) ? props : { content: props };
  validatedProps = { ...Index.configuration.defaultToastProps, ...validatedProps };

  const id = uniqueId();
  Index.methods.setToasts((toasts) => [...toasts, {
    ...validatedProps,
    key: id,
    id,
  }]);

  if (validatedProps.duration) {
    setTimeout(() => Index.remove(id), validatedProps.duration);
  }

  return id;
};
Index.remove = (id) => {
  Index.methods.setToasts((toasts) => {
    return filter(toasts, (toast) => toast.id !== id);
  });
};
Index.configure = (customConfiguration = null) => {
  const configuration = merge({}, defaultConfiguration, customConfiguration);
  Index.configuration = configuration;

  Index.rootSiblings = new RootSiblings(
    <Index {...configuration} />
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

export default Index;
