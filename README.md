# @mpth/react-in-view

> React component to wrap a non SSR component and only show it when it comes into our viewport, speeding up the eventloop while rendering pages SSR and only truly load/show it when it comes into the users view. Works with React >= 16.5.0

When working with Server Side Rendering(SSR) enabled apps, you have to deal with client only components. This wrapper makes it simple to work with those components when you wanted to load data and or when the component comes into the view. Make sure you have 'react-intersection-observer' installed in your application.

[npmjs.com/package/@mpth/react-in-view](https://www.npmjs.com/package/@mpth/react-in-view)

### Installation

```
yarn add @mpth/react-in-view
```

### Online demonstration

_Heroku container spins down when no activity, please be patient!_. See [graphql-schiphol.herokuapp.com](https://graphql-schiphol.herokuapp.com/lazy) for a live demonstration. I will add some storybook/codepen examples overhere too but this lazy example shows how it can be used.

On [line 13](https://github.com/maapteh/graphql-modules-app/blob/master/packages/app/src/modules/App.tsx#L13) we added the intersection-observer polyfill for IE11. The code for the page itself comes from [lazy.js](https://github.com/maapteh/graphql-modules-app/blob/master/packages/app/src/pages/lazy.js). Now if you watch this page when its spinned up you can see the last two calls are being only made when the user scrolls to them.

### Usage

`Foo` is our **client only** component:

```js
import React from 'react';
import InView from '@mpth/react-in-view';
import Foo from '../modules/foo';
import Bar from '../modules/bar';

const Page = () => (
    <>
        <h1>Page</h1>
        <Bar />
        <InView>
            <Foo />
        </InView>
    </>
);
```

Then, `<Foo />` component is only rendered on the client just after it's mounted and in our view. Its possible to add css to the main component to have an aspect ratio to prevent reflows for example. Also can you tweak from how many pixels it starts painting it.

options:

1. fallback
2. rootMargin
3. className

### ad 1. Render a Component on SSR with a personal fallback

Usually, we need to add some loading text or similar until `<Foo />` component starts to render. This fallback is rendered server-side. Here's how to do it.

```js
const Loading = () => <div>Loading...</div>;
const Page = () => (
    <>
        ....
        <InView fallback={<Loading />}>
            <Foo />
        </InView2>
    </>
);
```

Now `<Loading />` component will be rendered until `<Foo />` component comes in the viewport.

### ad 2.

Set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. For example '20px 0px 280px 0px'

### ad 3.

Add your own css to the main container for example to set a min-height, or aspect ratio or preloading.

[![Codecov Coverage](https://img.shields.io/codecov/c/github/maapteh/react-in-view/master.svg?style=flat-square)](https://codecov.io/gh/maapteh/react-in-view/)
