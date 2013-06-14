library-demo-js
===============

Download dependencies:
```
   npm install
```
Get the grunt-cli runner
```
	npm install grunt-cli -g
```

Continuous tests
================
Run
```
	grunt watch
```
This will watch for all changes to spec and source javascript files in the development environment and rerun the specs in a new process each time it detects anything that changes.

Debugging jasmine-node tests
============================

Install the really cool node webkit debugger:
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

Database backend
================

Using Super Modern Fast Webscale 2.0 persistence!!1

(CouchDB on Erlang/OTP R15B03-1 | Version 1.3.0, available at http://www.apache.org/dyn/closer.cgi?path=/couchdb/binary/win/1.3.0/setup-couchdb-1.3.0_R15B03-1.exe)

Continuous Integration
======================
https://holyhaddock.ci.cloudbees.com/job/library-demo-js/