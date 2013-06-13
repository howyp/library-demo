library-demo-js
===============

Download dependencies:
```
   npm install
```
Get supervisor (for hot deploys):
```
   npm install supervisor -g
```

Get jasmine-node (for running nodejs tests)
```
	npm install jasmine-node -g
```

Get the grunt-cli runner
```
	npm install -g grunt-cli
```

Continuous tests
================

You can run the Jasmine specs continuously while you develop by using the maven goal
```
	mvn jasmine:bdd
```

Results will be sent on a local web server as you add, remove and make changes to the watched source and spec folders.

You can also run the api tests with jasmine-node by running
```
	jasmine-node src/test/js/unit/app.spec.js
```

Debugging jasmine-node tests
============================

This one is just super-fun.
First, install the really cool node webkit debugger:
```
	npm install node-inspector -g
```

Then run the tests suspended using the jasmine-node script-runner. If you've installed jasmine-node globally, as suggested above, this looks something like the following:
```
	node --debug-brk %APPDATA%\npm\node_modules\jasmine-node\lib\jasmine-node\cli.js src/test/js/unit/app.spec.js
```
In another window, run:
```
	node-inspector &
```

and point a web browser at http://127.0.0.1:8080/debug?port=5858.

Continuous Integration
======================
https://holyhaddock.ci.cloudbees.com/job/library-demo-js/