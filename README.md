# react-native-toasty

This React-Native toast library offers style and layout customization
by **supplying your own display components**.

By supplying your own display component, you can pass **any props** you need,
and **structure** the contents however you want.

## Installation

```$jsx
yarn add react-native-toasty
```

*(No linking required.)*

## Usage

```$jsx
import Toast from 'react-native-toasty';

// String content shorthand
Toast.add('Hello Toasty!');

// ReactNode content shorthand
Toast.add(<Text>Hello Toasty!</Text>);

// Full custom props
Toast.add({
  content: 'Hello Toasty!',
  duration: 3500,
  ToastComponent: ({ content }) => <View><Text>{content}</Text></View>
});
```

[See a more in-depth example.](./lib/CustomComponentExample.js)

## Configuration

Make sure to call `Toast.configure` once in your app, before calling `Toasts.add`.

```$jsx
import Toast, { DefaultToast, DefaultToastContainer } from 'react-native-toasty';

Toast.configure({

  // Set default props for every toast
  defaultToastProps: {
    duration: 3500,
    ToastComponent: DefaultToast,
  },
  
  // Override the container (controls stacking and position)
  ToastContainerComponent: DefaultToastContainer,
});
```

[See a more in-depth example.](./lib/ConfigurationExample.js)

## Running the example app

You can find an Expo app in the `examples` directory.
Run it with `yarn install && yarn start`.
