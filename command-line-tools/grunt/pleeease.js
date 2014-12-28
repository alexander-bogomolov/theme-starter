module.exports = {
  dev:  {
    options: {
      autoprefixer: {
        browsers: [
          "> 1%",
          "last 2 versions",
          "Firefox ESR",
          "Opera 12.1"
        ],
        cascade:  true
      },
      filters:      {"oldIE": true},
      rem:          ["16px",
                     {replace: false}],
      minifier:     true
    },
    files:   {
      '../assets/css/dev/style.min.css': '../assets/css/dev/style.css'
    }
  },
  prod: {
    options: {
      autoprefixer: {
        browsers: [
          "> 1%",
          "last 2 versions",
          "Firefox ESR",
          "Opera 12.1"
        ],
        cascade:  true
      },
      filters:      {"oldIE": true},
      rem:          ["16px",
                     {replace: false}],
      minifier:     true
    },
    files:   {
      '../assets/css/prod/style.min.css': '../assets/css/dev/style.css'
    }
  }
};