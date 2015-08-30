module.exports = function (grunt) {

    //Source file definition
    var files = [
        "src/*js",
        "test/*js"
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: 
					'//! <%= pkg.name %>\n' + 
					'//! <%= pkg.description %>\n' +
					'//! version : <%= pkg.version %>\n' + 
					'//! authors : <%= pkg.author %>\n' + 
					'//! license : <%= pkg.license %>\n' + 
					'//! built   : <%= grunt.template.today("yyyy-mm-dd") %>\n' + 
					'//! https://github.com/<%= pkg.author %>/<%= pkg.name %>\n'
            },
            build: {
                src: 'src/<%= pkg.name %>*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            files: files
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};