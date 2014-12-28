module.exports = {
  // Detect errors and potential problems in JavaScript code
  // and used to enforce coding conventions.
  options:       {
    reporter: require('jshint-stylish'),
    jshintrc: '.jshintrc',
    globals:  {
      // third-party
      require:   true,
      jQuery:    true,
      Modernizr: true
    }
  },
  configuration: [
    'Gruntfile.js',
    'grunt/*.js'
  ],
  defaults:      [
    '../assets/js/modules/**/*.js',
    '../assets/js/modules/*.js',
    '../assets/js/init/*.js'
  ]
};