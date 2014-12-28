module.exports = {
  // Define configuration for the compass module: grunt-contrib-compass
  dev: {
    options: {
      bundleExec:         true,
      clean:      false,
      //clean:              true,
      config:     'compass-config-dev.rb'
      //httpPath:           '/',
      //cssDir:             '../assets/css/dev',
      //sassDir:            '../assets/sass',
      //javascriptsDir:     '../assets/js',
      //imageDir:           '../assets/images',
      //generatedImagesDir: '../assets/images/sprites',
      //sourcemap:          true,
      //relativeAssets:     true
    }
  }
};