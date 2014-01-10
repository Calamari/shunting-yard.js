module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      all: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/**/*_spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
};
