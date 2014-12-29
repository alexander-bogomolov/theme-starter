module.exports = {
  // Define configuration for the compass module: grunt-contrib-compass
  dev: {
    options: {
      bundleExec:  true,
      loadPath:    '../assets/sass',
      sourcemap:   'inline',
      trace:       true,
      style:       'expanded', // nested, compact, compressed, expanded
      precision:   5,
      lineNumbers: true,
      noCache:     true,
      update:      true,
      banner:      '<%= banner %>'
    },
    files:   {
      '../assets/css/dev/style.css': '../assets/sass/style.scss'
    }
  }
};