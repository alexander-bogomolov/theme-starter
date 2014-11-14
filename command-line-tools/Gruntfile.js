/*global module:false*/
module.exports = function (grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  // Project configuration
  grunt.initConfig({
    pkg:     grunt.file.readJSON('package.json'),

    // Meta data
    // Generates comment block over the code.
    meta:    {
      banner: '/**\n' +
              ' * Project: <%= pkg.title || pkg.name %>\n' +
              ' * Version: <%= pkg.project_version %> - <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
              ' * Homepage: <%= pkg.homepage %>\n' +
              ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.company %>\n' +
              ' * Author: <%= pkg.author.name %>\n' +
      ' */'
    },

    // Define configuration for the compass module: grunt-contrib-compass
    compass: {
      dev: {
        options: {
          bundleExec: true,
          config:     'compass-config-dev.rb'
        }
      }
    },

    // Detect errors and potential problems in JavaScript code
    // and used to enforce coding conventions.
    jshint:  {
      beforeconcat: [
        'Gruntfile.js',
        '../assets/js/modules/**/*.js',
        '../assets/js/modules/*.js',
        '../assets/js/init/*.js'
      ],
      options:      {
        // Enforcing Options - These options tell JSHint to be more strict towards your code.
        curly:    true, // This option requires you to always put curly braces around blocks in loops and conditionals.
        eqeqeq:   true, // This options prohibits the use of == and != in favor of === and !==.
        forin:    true, // This option requires all for in loops to filter object's items.
        immed:    true, // This option prohibits the use of immediate function invocations without wrapping them in parentheses.
        latedef:  true, // This option prohibits the use of a variable before it was defined.
        newcap:   true, // This option requires you to capitalize names of constructor functions.
        noarg:    true, // This option prohibits the use of arguments.caller and arguments.callee. Both .caller and .callee make quite a few optimizations impossible so they were deprecated in future versions of JavaScript.
        undef:    true, // This option prohibits the use of explicitly undeclared variables.
        unused:   true, // This option warns when you define and never use your variables.
        trailing: false, // This option makes it an error to leave a trailing whitespace in your code.

        // Relaxing Options - These options allow you to suppress certain types of warnings.
        boss:     true, // This option suppresses warnings about the use of assignments in cases where comparisons are expected.
        debug:    false, // This option suppresses warnings about the debugger statements in your code.
        eqnull:   true, // This option suppresses warnings about == null comparisons. Such comparisons are often useful when you want to check if a variable is null or undefined.
        evil:     true, // This option suppresses warnings about the use of eval.
        onecase:  true, // This option suppresses warnings about switches with just one case.
        sub:      true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
        white:    false, // This option make JSHint check your source code against Douglas Crockford's JavaScript coding style. Unfortunately, his “The Good Parts” book aside, the actual rules are not very well documented.

        // Environments - These options pre-define global variables that are exposed by popular JavaScript libraries and runtime environments—such as browser or node.js. Essentially they are shortcuts for explicit declarations like global $:false, jQuery:false.
        browser:  true, // This option defines globals exposed by modern browsers: all the way from good ol' document and navigator to the HTML5 FileReader and other new developments in the browser world.
        devel:    true, // This option defines globals that are usually used for logging poor-man's debugging: console, alert, etc. It is usually a good idea to not ship them in production because, for example, console.log breaks in legacy versions of Internet Explorer.
        jquery:   true, // This option defines globals exposed by the jQuery JavaScript library.
        globals:  {
          // third-party
          require:   true,
          jQuery:    true,
          Modernizr: true
        }
      }

    },

    // Minify and concate JavaScript file.
    uglify:  {
      options: {
        banner: '<%= meta.banner %>'
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
    },

    // Run QUnit - JavaScript unit testing framework
    qunit:   {
      files: [
        '../assets/test/**/*.html'
      ]
    },


    pleeease: {
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
          rem:          ["16px", {replace: false}],
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
          rem:          ["16px", {replace: false}],
          minifier:     true
        },
        files:   {
          '../assets/css/prod/style.min.css': '../assets/css/dev/style.css'
        }
      }
    },

    imagemin: {
      uploads: {
        options: {
          optimizationLevel: 3,
          svgoPlugins:       [{removeViewBox: false}],
          use:               [mozjpeg()]
        },
        files:   [
          {
            expand: true,                       // Enable dynamic expansion
            cwd:    '../uploads/',        // Src matches are relative to this path
            src:    ['**/**/*.{png,jpg,gif}'],  // Actual patterns to match
            dest:   '../uploads-opt/'     // Destination path prefix
          }
        ]
      }
    },

    concurrent: {
      dev: [
        'compass:dev',
        'jshint:beforeconcat',
        'uglify:dev'
      ]
    },


    // Watch Task
    watch:      {
      files: [
        '../assets/sass/*',
        '../assets/sass/**/*',
        '<%= jshint.beforeconcat %>'
      ],
      tasks: [
        'default'
      ]
    }
  });


  // Load modules
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-pleeease');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Register Tasks
  // Run: grunt taskname
  // Example: grunt css
  grunt.registerTask('images',
    [
      'imagemin:uploads',
    ]);

  grunt.registerTask('test',
    [
      'jshint:beforeconcat',
    ]);

  grunt.registerTask('css-dev',
    [
      'compass:dev',
      'pleeease:dev'
    ]);

  grunt.registerTask('css-prod',
    [
      'compass:dev',
      'pleeease:prod'
    ]);

  grunt.registerTask('js-dev',
    [
      'jshint:beforeconcat',
      'uglify:dev'
    ]);

  grunt.registerTask('js-prod',
    [
      'jshint:beforeconcat',
      'uglify:prod'
    ]);

  grunt.registerTask('prod',
    [
      'compass:dev',
      'pleeease:dev',
      'pleeease:prod',
      'jshint:beforeconcat',
      'uglify:dev',
      'uglify:prod'
    ]);

  grunt.registerTask('dev',
    [
      'compass:dev',
      'pleeease:dev',
      'jshint:beforeconcat',
      'uglify:dev'
    ]);

  grunt.registerTask('default',
    [
      'concurrent:dev',
      'pleeease:dev'
    ]);


};
