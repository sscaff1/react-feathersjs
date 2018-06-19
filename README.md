# React-FeathersJS

This library offers a simple way to to connect your React application to your
FeathersJS back-end. The library is isomorphic by nature so it's easy to use
with both React and React Native.

## Usage

Install the package:

```
yarn add react-feathersjs
```

or

```
npm i --save react-feathersjs
```

Then wrap your App in the FeathersWrapper component:

```js
import React from 'react';
import { render } from 'react-dom';
import { FeathersProvider } from 'react-feathersjs';
import App from './src';

render(
  <FeathersProvider>
    <App/>
  </FeathersProvider>,
  document.getElementById('app')
);
```

Then in your app:

```js
// in src/App.js
import React from 'react';
import { connectFeathers } from 'react-feathersjs';

function App({ feathers }) {
  console.log(feathers); // feathers client object is available for use!
  return (
    <div>
      <h1>I love FeathersJS!</h1>
    </div>
  );
}

export default connectFeathers(App);
```

## API

### FeathersProvider

See /src/types.js for the props provided. Essentially what this does though is
connect to a feathers back-end and then pass the feathers object through context
to its children.

### connectFeathers

A HOF that accepts a wrapped component as its first parameter and an options
object as its second parameter. Currently, the only key in the options object
is withRef which provides a ref for the wrapped component (this option is false
by default). If you need to access the wrapped component then use the method
getWrappedInstance().

## Future Development

Right now the library connects to your FeathersJS back-end through socket-io. In
the future, I'd like to give the option to connect to a rest only back-end. I'd
also like to rewrite the library in typescript. Help is always welcome :smile:
