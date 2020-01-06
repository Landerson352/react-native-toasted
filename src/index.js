import React from 'react';
import { LayoutAnimation } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { filter, merge, uniqueId } from 'lodash';

import DefaultToast from './DefaultToast';
import DefaultToastContainer from './DefaultToastContainer';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
