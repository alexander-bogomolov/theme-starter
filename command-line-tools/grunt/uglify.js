module.exports = {
  // Minify and concate JavaScript file.
  options: {
    banner: '<%= banner %>' // <%= meta.banner %>
  },
  dev:     {
    options: {
      report:                  'min',
      sourceMap:               true,
      sourceMapIncludeSources: true
    },
    files:   {
      '../assets/js/application.js': [
        // Vendor
        // '../assets/vendor/',

        // Globale Module
        //'../assets/js/modules/',

        // Inits
        '../assets/js/init/application.init.js'
      ]
    }
  },
  prod:    {
    options: {
      report: 'gzip'
    },
    files:   {
      '../assets/js/application.min.js': [
        // Vendor
        // '../assets/vendor/',

        // Globale Module
        //'../assets/js/modules/',

        // Inits
        '../assets/js/init/application.init.js'
      ]
    }
  }
};