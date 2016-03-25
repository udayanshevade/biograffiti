module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        'sass': {
          'dist': {
            'options': {
              'style': 'expanded'
            },
            'files': {
              'src/css/style.css': 'src/css/scss/style.scss'
            }
          }
        },
        'cssmin': {
            'target': {
                'files': [{
                    'expand': true,
                    'cwd': 'src/',
                    'src': 'css/style.css',
                    'dest': 'dist/',
                    'ext': '.min.css'
                }]
            }
        },
        'htmlmin': {
            'dist': {
                'options': {
                    'removeComments': true,
                    'collapseWhitespace': true
                },
                'files': {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        'jshint': {
            'all': ['Gruntfile.js', 'src/js/index.js']
        },
        'uglify': {
            'dist/js/index.min.js': [
                'src/js/lib/angular.min.js',
                'src/js/lib/angular-sanitize.min.js',
                'src/js/index.js'
            ]
        },
        'processhtml': {
            'dist': {
                'files': {
                    'dist/index.html': ['src/index.html']
                }
            }
        },
        'watch': {
            'gruntfile': {
              'files': 'Gruntfile.js',
              'tasks': ['jshint']
            },
            'scripts': {
                'files': 'src/index.js',
                'tasks': ['jshint', 'uglify'],
                'options': {
                    'spawn': false,
                },
            },
            'styles': {
              'files': ['src/css/scss/style.scss'],
              'tasks': ['sass', 'cssmin']
            },
            'html': {
              'files': ['src/index.html'],
              'tasks': ['processhtml']
            },
            'index': {
              'files': ['dist/index.html'],
              'tasks': ['htmlmin']
            }
        }
    });

    grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'processhtml', 'htmlmin', 'watch']);

};