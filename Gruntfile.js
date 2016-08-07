module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'src/js/libs/*.js',
                    'src/js/modules/*.js', // Все JS в папке modules
                    'src/js/global.js'  // Конкретный файл
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
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin','sass', 'watch']);

};