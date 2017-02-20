'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // ES linter
        eslint: {
            target: [
                'Gruntfile.js',
                'src/js/**/*.js',
                'src/tests/spec/**/*.js'
            ]
        },

        // Concatinate js files
        concat: {
            distJs: {
                src: [
                    'src/js/**/*.js'
                ],
                dest: 'temp/js/main.js'
            }
        },

        // Minify js files
        uglify: {
            options: {
                mangle: false
            },
            mainJs: {
                src: 'temp/js/main.js',
                dest: 'dist/js/main.min.js'
            }
        },

        // SCSS linter
        scsslint: {
            all: [
                'src/sass/*.scss'
            ],
            options: {
                bundleExec: false,
                config: '.scss-lint.yml'
            }
        },

        // Compile scss to css
        sass: {
            options: {
                sourceMap: false
            },
            dev: {
                files: {
                    'src/css/rock-paper-scissors.css': 'src/sass/rock-paper-scissors.scss'
                }
            }
        },

        // Concatinate css files
        concat_css: {
            all: {
                src: 'src/css/*.css',
                dest: 'temp/css/main.css'
            }
        },

        // Minify css files
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'temp/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        // Copies bower dependencies
        bowercopy: {
            options: {
                clean: true
            },
            angularJS: {
                options: {
                    destPrefix: 'dist/js'
                },
                files: {
                    'libs/angular.min.js': 'angular/angular.min.js'
                }
            }
        },

        /**
         * Run unit tests by either runing Karma or Jasmine task
         *
         */
        // Jasmine
        jasmine: {
            pivotal: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'src/js/**/*.js'
                ],
                options: {
                    specs: 'src/tests/spec/**/*.js',
                    summary: true
                }
            }
        },
        // Karma
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    reporters: ['progress', 'coverage'],
                    files: [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'src/js/**/*.js',
                        'src/tests/spec/**/*.js'
                    ]
                }
            }
        },

        // Clean temporary folders and files created during the build
        clean: {
            temp: [
                'temp', 'src/css/**/*.map'
            ]
        },

        // Watch css and js files
        watch: {
            sass: {
                files: [
                    'src/sass/**/*.scss'
                ],
                tasks: [
                    'scsslint',
                    'sass',
                    'concat_css',
                    'cssmin',
                    'clean'
                ]
            },
            js: {
                files: [
                    'src/js/**/*.js'
                ],
                tasks: [
                    'eslint',
                    'concat',
                    'uglify'
                ]
            }
        }
    });

    grunt.registerTask('sca', [
        'eslint',
        'scsslint'
    ]);

    grunt.registerTask('test', [
        'sca',
        'karma'
    ]);

    grunt.registerTask('build_css', [
        'scsslint',
        'sass',
        'concat_css',
        'cssmin',
        'clean'
    ]);

    grunt.registerTask('build_js', [
        'eslint',
        'concat',
        'uglify',
        'bowercopy',
        'clean'
    ]);

    grunt.registerTask('build_assets', [
        'clean',
        'test',
        'build_css',
        'build_js',
        'bowercopy'
    ]);
};
