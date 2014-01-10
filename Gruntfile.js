module.exports = function(grunt) {
  grunt.initConfig({
    concat: { // grunt-contrib-concat
      dist: {
        src: ['src/shunting_yard.js', 'src/resolve_rpn.js'],
        dest: 'dist/shunting-yard.js'
      },
      options: {
        separator: ';',
      }
    },
    jasmine: {
      all: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/**/*_spec.js'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/shunting-yard.min.js': 'dist/shunting-yard.js'
        },
        options: {
          preserveComments: 'some'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['concat', 'uglify']);
};
