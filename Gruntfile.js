module.exports = function(grunt) {

  debugger;
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
    // jasmine: {
    // 	angular : {
    // 		src: 'src/angular/js/**/*.js',
    // 		options:  {
    // 			specs: 'spec/angular/**/*.spec.js'
    // 		}
    // 	}
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jasmine-node');

  grunt.registerTask('test', ['jasmine_node']);

  grunt.registerTask('default', ['jasmine_node']);

};