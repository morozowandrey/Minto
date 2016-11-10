module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'src/js/libs/*.js',
                    'src/js/modules/*.js',
                    'src/js/global.js'
                ],
                dest: 'build/production.js',
            }
        },
        uglify: {
            build: {
                src: 'build/production.js',
                dest: 'build/production.min.js'
            }
        },
        pug: {
            dist: {
                options: {
                    pretty: true
                },
                files: {
                    'index.html': 'src/pug/**/*.pug'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/main.css': 'src/sass/main.scss'
                }
            }
        },
        css: {
            files: ['src/sass/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false,
            }
        },
        watch: {
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['concat','uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            pug: {
                files: ['src/pug/**/*.pug'],
                tasks: ['pug'],
                options: {
                },
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin','sass', 'watch', 'pug']);

};