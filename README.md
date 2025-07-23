`react-testeranto` is a helper library that assists in testing react components. It's purpose is to integrate your testeranto test with the `react`, `react-dom`, and `react-test-renderer`.

While more combinations are possible, the most likely pattern will be:

1) test you react component with react-dom, in the browser
2) test your react component with react-test-renderer, in the browser.
3) snapshot test your react component with react-dom, on the server.

