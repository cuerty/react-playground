module.exports = function (grunt) {

  var appConfig = grunt.file.readJSON('package.json');

  // Load grunt tasks automatically
  // see: https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // see: https://npmjs.org/package/time-grunt
  require('time-grunt')(grunt);

  var pathsConfig = function (appName) {
    this.app = 'r';

    return {
      app: this.app,
      templates: this.app + '/templates',
      css: this.app + '/static/css',
      images: this.app + '/static/images',
      js: this.app + '/static/js',
      manageScript: this.app + '/manage.py',
    }
  };

  grunt.initConfig({

    paths: pathsConfig(),
    pkg: appConfig,

    // see: https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      uglify: {
        files: [
          '<%= paths.js %>/*.src.js'
        ],
        tasks: ['uglify:dev'],
        options: {
          atBegin: true
        }
      }
    },

    // see: https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          '<%= paths.js %>/react-playground.js': [
            '<%= paths.js %>/**.src.js'
          ]
        }
      },
      dist: {
        options: {
          compress: true
        },
        files: {
          '<%= paths.js %>/react-playground.js': [
            '<%= paths.js %>/**.src.js'
          ]
        }
      }
    },

    // see: https://npmjs.org/package/grunt-bg-shell
    bgShell: {
      _defaults: {
        bg: true
      },
      runDjango: {
        cmd: 'python <%= paths.manageScript %> runserver'
      },
    }
  });

  grunt.registerTask('serve', [
    'bgShell:runDjango',
    'watch'
  ]);

  grunt.registerTask('build', [
    'uglify:dist',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
