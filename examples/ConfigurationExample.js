import { LayoutAnimation } from 'react-native';

import Index, { DefaultToastContainer, DefaultToast } from '../index';

// This configuration is completely optional.
// Each value can be removed or overridden.
// If you want to style the toasts, just override the base ToastComponent.
Index.configure({
  defaultToastProps: {
    duration: 3500,
    ToastComponent: DefaultToast,
  },
  layoutAnimationConfig: LayoutAnimation.Presets.easeInEaseOut, // Hint: try "spring" instead
  ToastContainerComponent: DefaultToastContainer,
});
