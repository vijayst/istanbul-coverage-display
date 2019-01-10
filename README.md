# istanbul-coverage-display
React component which can be added to instrumentation build to display coverage report of testing.

To install
```
npm install istanbul-coverage-display
```

It has a peer dependency of React 16. This component should be part of the test build only. In the test build, you should be using `babel-plugin-istanbul`
to instrument the source code. This component has a peer (indirect) dependency on `istanbul-lib-coverage` installed by `babel-plugin-istanbul`.

Import using
```
import Coverage from 'istanbul-coverage-display';
```
This component adds a button to one of the four corner of the browser window to show coverage report. The position prop accepts four values: 
one of bottomLeft, topLeft, bottomRight, topRight. By default, the button is at the bottomLeft.

There is a [demo project](https://github.com/vijayst/istanbuldemo) for this package. And there is a [blog post](https://vijayt.com/post/code-coverage-of-manual-testing-using-istanbul/) with more details about why we need this.

Screenshot of the component display coverage report:
![Coverage display]('coverage-display.png')
