module.exports = {
  uploads: {
    options: {
      optimizationLevel: 3,
      svgoPlugins:       [{removeViewBox: false}],
      use:               [require('imagemin-mozjpeg')()]
    },
    files:   [
      {
        expand: true,                       // Enable dynamic expansion
        cwd:    '../uploads/',              // Src matches are relative to this path
        src:    ['**/**/*.{png,jpg,gif}'],  // Actual patterns to match
        dest:   '../uploads-output/'        // Destination path prefix
      }
    ]
  }
};