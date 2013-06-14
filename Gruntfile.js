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
          forceexit: true,
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
    },
    watch: {
      files: '**/*.js',
      tasks: ['test']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        beautify: true
      },
      build: {
        files: {
          'build/angular/js/app.min.js': ['src/angular/js/*.js']
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/angular/', 
          src: ['*', 'css/**', 'img/**', 'partials/**', 'js/lib/**'], 
          dest: 'build/angular/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jasmine-node', 'jasmine:angular']);
  grunt.registerTask('package', ['copy', 'uglify']);

  grunt.registerTask('default', ['test', 'package']);

};