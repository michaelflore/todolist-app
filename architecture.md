# Routing
React Router v7

[GitHub Link](https://github.com/remix-run/react-router)

# Components
Material UI

It comes packaged with default styles and uses emotion as its default styling engine
Use the material icons as well

Need to install @emotion/styled as well

# Styling

### CSS-in-JS
Emotion

Use the @emotion/react library specific for react

To use css prop with typscript add to tsconfig.json
```
jsxImportSource: "@emotion/react"
```

Add to vite config to have css prop work properly
```
react(
    {
      jsxImportSource: "@emotion/react"
    }
  )
```

or you can import at the top of each file (optional)
/** @jsxImportSource @emotion/react */

# Testing
### Jest

npm i -D jest

by default jest wont support ESM out of the box, so we could use provided options in jest docs or in this case we can use typescript

lets use typescript via ts-jest (a jest transformer)
```
npm i -D ts-jest
```

Create a configuration file
```
npx ts-jest config:init
```

Add the Jest global API typed
```
npm i -D @types/jest
```

Now jest will transpile typescript with jest and since our __tests__ folder is in src it will use the proper tsconfig.json

running tests will work
```
npm run test
```

we can also rename jest.config.js to jest.config.ts, Jest will use ts-node to compile the config file so we need that as well
```
npm i -D ts-node
```

can also add the below to tsconfig if having issues related to imports
```
"esModuleInterop": true,
```

### React Testing Library

Since we are going to be using it with jest (our test runner) we need a few dependencies
```
npm i -D @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
```

jest-dom provides custom jest matchers that extend jest, while user-event is meant to simulate real events in the brower as the user would interact with elements on the page.

create a test setup file setupTests.ts and add it to the jest.config.ts file
```
setupFilesAfterEnv: [
  "<rootDir>/setupTests.ts"
],
```
add line import "@testing-library/jest-dom";

include setupTests.ts in tsconfig next to the src

As of jest 28 you must install jest-environment-jsdom separately
```
npm install -D jest-environment-jsdom
```

change environment in jest.config.ts for a browser like environment, since the default is node
```
testEnvironment: "jsdom",
```

add the right config in the jest.config.ts for ts-jest to use
```
transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json"
      }
    ],
  }
```
