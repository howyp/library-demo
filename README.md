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

Continuous tests
================

You can run the Jasmine specs continuously while you develop by using the maven goal
```
	mvn jasmine:bdd
```

Results will be sent on a local web server as you add, remove and make changes to the watched source and spec folders.

You can also run the api tests with jasmine-node by running



Continuous Integration
======================
https://holyhaddock.ci.cloudbees.com/job/library-demo-js/