module.exports = {
  // Watch Task
  scripts: {
    files: [
      '../assets/js/modules/**/*.js',
      '../assets/js/modules/*.js',
      '../assets/js/init/*.js'
    ],
    tasks: [
      'js-dev'
    ]
  },

  styles:  {
    files: [
      '../assets/sass/*.scss',
      '../assets/sass/**/*.scss'
    ],
    tasks: [
      'css-dev'
    ]
  }
};