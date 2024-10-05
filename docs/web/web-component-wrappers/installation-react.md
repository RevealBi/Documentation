import BetaWarning from './_beta-message.md'

# Installing Reveal SDK Web Component Wrappers in React

<BetaWarning />

The Reveal SDK Web Component Wrappers provides a React-friendly version of each component, ensuring an idiomatic experience for React developers. You can easily switch between HTML and React examples throughout the documentation.

## Installation

To add the Reveal SDK Web Component Wrappers to your React app, install the necessary packages from npm:

```bash npm2yarn
npm install reveal-sdk-wc-wrappers reveal-sdk-wc-wrappers-react
```

## Using Reveal SDK Web Components

Once everything is set up, you're ready to use the Reveal SDK Web Component Wrappers within your React application. Here's an example of integrating the RvRevealView component:

```tsx
import React from 'react';
import { RvRevealView } from 'reveal-sdk-wc-wrappers-react';

function App() {
  return (
    <div>
      <RvRevealView dashboard="Sales"></RvRevealView>
    </div>
  );
}

export default App;
```

With these steps, you've successfully integrated the Reveal SDK Web Component Wrappers into your React application. You can now leverage Reveal's powerful data visualization capabilities to enhance your projects. Explore more components and features to create a rich and interactive user experience.