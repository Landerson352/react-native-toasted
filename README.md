# react-native-toasted

This React-Native toast library offers style and layout customization
by **supplying your own display components**.

By supplying your own display component, you can pass **any props** you need,
and **structure** the contents however you want.

## Installation

```jsx
yarn add react-native-toasted
```

## Usage

#### Basic syntax

If `Toasted.add` is called with a string or React node,
it will be passed into the display component as the `content` prop.

```jsx
import Toasted from 'react-native-toasted';

Toasted.add('Get Toasted!');
Toasted.add(<Text>Get Toasted!</Text>);
```

#### Full-props syntax

To override the duration or display component for a single toast,
use the full-props syntax.

```jsx
Toasted.add({
  content: 'Get Toasted!',
  duration: 3500,
  ToastComponent: ({ content }) => <View><Text>{content}</Text></View>
});
```

Also use the full-props syntax to implement your own custom props.

```jsx
Toasted.add({
  icon: 'star',
  text: 'Get Toasted!',
  duration: 3500,
  ToastComponent: ({ icon, text }) => (
    <View>
        <Icon name={icon} />
        <Text>{text}</Text>
    </View>
  )
});
```

## Global configuration

To set the default props and display components for **all** toasts,
call `Toasted.configure` once in your app (before calling `Toasted.add`).

(Here we import the default components for demonstration, but you can supply your own.)

```jsx
import Toasted, { DefaultToast, DefaultToastContainer } from 'react-native-toasted';

Toasted.configure({

  // Set default props for every toast
  defaultToastProps: {
    duration: 3500,
    ToastComponent: DefaultToast,
  },
  
  // Override the container (controls stacking and position)
  ToastContainerComponent: DefaultToastContainer,
});
```

## Running the example app

You can find an Expo app in the `examples` directory.
Run it with `yarn install && yarn start`.
