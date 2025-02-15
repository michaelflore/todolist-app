1) Fetch

Our tests will work but when using global apis such as fetch we get an error such as "fetch is not defined"
we also could get this error

TextEncoder is not defined - This error occurs when you bump react-router-dom from version 6 to 7
[Here is a link for more info](https://remarkablemark.org/blog/2025/02/02/fix-jest-errors-in-react-router-7-upgrade/)

The problem is when testing our react components with RTL we would use the test environment jsdom but this does not come with
certain globals that would be available with node environment.

The solution

since jsdom does not include fetch we first need to use [jest-fixed-dom](https://github.com/mswjs/jest-fixed-jsdom) instead
```
npm i jest-fixed-jsdom --save-dev
```
change jest.config.ts
```
testEnvironment: "jest-fixed-jsdom",
```

This setup is a **workaround** , a more modern solution could be instead using vitest, which may have this config out of the box.

This will restore fetch but its now recommended to use msw to create a mock server instead of having to mock out the global fetch

Explanations:

[Click here if you want to mock fetch](https://benjaminjohnson.me/mocking-fetch)

[Click here for why you wouldnt want to mock fetch](https://kentcdodds.com/blog/stop-mocking-fetch)

Note that the setup with rest and ctx in the examples above are outdated.

Install msw
```
npm i msw@latest -D
```
2) Userevent

when doing await user.click() it will wait until the change handler and all async functions (if any) are completed.
added delay() to sw handlers since the response was happening immediately in tests and could not test for spinner.

3) json-server and jest transform
type modoule in package.json for json-server and svgTransformer.js