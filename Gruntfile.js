module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    "jasmine-node": {
    	run: {
    		spec: "spec/api"
    	},
    	options: {
    		forceexit: true
    	}
    },
    jasmine: {
    	angular : {
    		src: 'src/angular/js/**/*.js',
    		options:  {
          vendor: [
              /* source libraries */
              "src/angular/js/lib/underscore-min.js",
              "src/angular/js/lib/jquery-1.9.1.min.js",
              "src/angular/js/lib/angular.js",
              "src/angular/js/lib/angular-resource.min.js",
              "src/angular/js/lib/angular-cookies.min.js",
              "src/angular/js/lib/bootstrap.min.js",
              "src/angular/js/lib/bootstrap-dropdown.js",
              "src/angular/js/lib/base64.js"],
            helpers: [
              /* test dependencies */
              "spec/angular/lib/angular-mocks.js",
              "spec/angular/lib/mocks.js"
          ],
    			specs: 'spec/angular/**/*.spec.js'
    		}
    	}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');

  grunt.registerTask('test', ['jasmine-node', 'jasmine:angular']);

  grunt.registerTask('default', ['test']);

};